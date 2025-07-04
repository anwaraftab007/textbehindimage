import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      toast({
        title: "Sign-in Error",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Welcome to BakTXT</h3>
              <p className="text-slate-400">Sign in to access the editor and create stunning designs</p>
            </div>

            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-white text-gray-900 py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-3 hover:bg-gray-100 transition-colors mb-4"
            >
              <FcGoogle className="text-xl" />
              <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
            </Button>

            <p className="text-xs text-slate-500 text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
