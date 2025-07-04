import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Loader2, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth';
import { useLocation } from 'wouter';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutForm = ({ orderData }: { orderData: any }) => {
  const { toast } = useToast();
  const { user, refreshUser } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    if (!user || !orderData) {
      return;
    }

    setIsLoading(true);

    try {
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'TextBehind',
        description: 'Lifetime Access to Text Behind Image Editor',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            await apiRequest("POST", "/api/verify-payment", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature
            });

            await refreshUser();
            
            toast({
              title: "Payment Successful!",
              description: "Welcome to TextBehind! Redirecting to the app...",
            });

            setTimeout(() => {
              setLocation('/app');
            }, 2000);
          } catch (error: any) {
            toast({
              title: "Payment Verification Failed",
              description: error.message || "Please contact support",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: user.user_metadata.full_name || user.email.split('@')[0],
          email: user.email,
        },
        theme: {
          color: '#6366f1'
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "An error occurred during payment",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-700">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
          <Crown className="text-white text-2xl" />
        </div>
        <CardTitle className="text-2xl text-white">Complete Your Purchase</CardTitle>
        <p className="text-slate-400">Secure payment powered by Razorpay</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-semibold">TextBehind Lifetime Access</span>
              <span className="text-2xl font-bold text-white">₹299</span>
            </div>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>✓ Unlimited text-behind-image designs</li>
              <li>✓ High-resolution downloads</li>
              <li>✓ Commercial usage rights</li>
              <li>✓ No watermarks</li>
              <li>✓ Lifetime updates</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center space-x-3 text-slate-300">
              <CreditCard className="h-5 w-5" />
              <span>Pay securely with Razorpay</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Supports UPI, Cards, Net Banking, and Wallets
            </p>
          </div>
          
          <Button 
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white py-3 text-lg font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay ₹299`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Checkout() {
  const [orderData, setOrderData] = useState<any>(null);
  const [, setLocation] = useLocation();
  const { user, appUser, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        setLocation('/');
        return;
      }

      if (appUser?.hasPaid) {
        setLocation('/app');
        return;
      }

      // Create Razorpay order
      apiRequest("POST", "/api/create-payment-order", {})
        .then((res) => res.json())
        .then((data) => {
          setOrderData(data);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: "Failed to initialize payment. Please try again.",
            variant: "destructive",
          });
          setLocation('/');
        });
    }
  }, [user, appUser, isLoading, setLocation, toast]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-400">Initializing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/')}
            className="text-slate-400 hover:text-white mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CheckoutForm orderData={orderData} />
        </motion.div>
      </div>
    </div>
  );
}
