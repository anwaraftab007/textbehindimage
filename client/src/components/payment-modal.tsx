import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    onClose();
    setLocation('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-slate-900 rounded-2xl max-w-md w-full p-8 relative border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Crown className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Complete Purchase</h3>
              <p className="text-slate-400">Get lifetime access for just ₹299</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="flex justify-between items-center">
                  <span className="text-white">BakTXT Lifetime Access</span>
                  <span className="font-bold text-white">₹299</span>
                </div>
                <ul className="text-sm text-slate-400 mt-2 space-y-1">
                  <li>✓ Unlimited designs</li>
                  <li>✓ High-resolution downloads</li>
                  <li>✓ Commercial usage rights</li>
                  <li>✓ No watermarks</li>
                </ul>
              </div>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-3 hover:opacity-90 transition-opacity mb-4"
            >
              <CreditCard className="h-5 w-5" />
              <span>Pay with Razorpay</span>
            </Button>

            <p className="text-xs text-slate-500 text-center">
              Secure payment processed by Razorpay. One-time payment, lifetime access.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
