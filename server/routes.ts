import type { Express } from "express";
import { createServer, type Server } from "http";
import Razorpay from "razorpay";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Missing required Razorpay keys: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get current user
  app.get("/api/user", async (req, res) => {
    const supabaseId = req.headers['x-supabase-user-id'] as string;
    
    if (!supabaseId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await storage.getUserBySupabaseId(supabaseId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create or get user
  app.post("/api/user", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      let user = await storage.getUserBySupabaseId(userData.supabaseId);
      
      if (!user) {
        user = await storage.createUser(userData);
      }
      
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Create Razorpay order for payment
  app.post("/api/create-payment-order", async (req, res) => {
    const supabaseId = req.headers['x-supabase-user-id'] as string;
    
    if (!supabaseId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await storage.getUserBySupabaseId(supabaseId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if user already paid
      if (user.hasPaid) {
        return res.status(400).json({ message: "User has already paid" });
      }

      const order = await razorpay.orders.create({
        amount: 29900, // ₹299 in paise (smallest unit)
        currency: "INR",
        receipt: `receipt_${user.id}_${Date.now()}`,
        notes: {
          userId: user.id.toString(),
          supabaseId: user.supabaseId,
        },
      });

      res.json({ 
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating payment order: " + error.message });
    }
  });

  // Verify Razorpay payment and update user status
  app.post("/api/verify-payment", async (req, res) => {
    const { paymentId, orderId, signature } = req.body;
    const supabaseId = req.headers['x-supabase-user-id'] as string;
    
    if (!supabaseId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await storage.getUserBySupabaseId(supabaseId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify payment signature with Razorpay
      const crypto = require('crypto');
      const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + '|' + paymentId)
        .digest('hex');

      if (expectedSignature === signature) {
        // Update user payment status
        const updatedUser = await storage.updateUserPaymentStatus(
          user.id, 
          true, 
          paymentId,
          orderId
        );
        
        res.json({ success: true, user: updatedUser });
      } else {
        res.status(400).json({ message: "Payment verification failed" });
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Check payment status
  app.get("/api/payment-status", async (req, res) => {
    const supabaseId = req.headers['x-supabase-user-id'] as string;
    
    if (!supabaseId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = await storage.getUserBySupabaseId(supabaseId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ hasPaid: user.hasPaid });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
