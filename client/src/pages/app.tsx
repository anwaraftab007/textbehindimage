import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';

export default function App() {
  const [, setLocation] = useLocation();
  const { user, appUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        setLocation('/');
      } else if (!appUser?.hasPaid) {
        setLocation('/checkout');
      }
    }
  }, [user, appUser, isLoading, setLocation]);

  if (isLoading || !user || !appUser?.hasPaid) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400">Loading app...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark/90 backdrop-blur-sm border-b border-slate-700/50 px-4 py-3"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/')}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-accent">
              <Crown className="h-4 w-4" />
              <span className="text-sm font-medium">Premium User</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://backdrop-text-behind-image.vercel.app/', '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in New Tab
            </Button>
          </div>
        </div>
      </motion.div>

      {/* App Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="h-[calc(100vh-73px)]"
      >
        <iframe 
          src="https://backdrop-text-behind-image.vercel.app/" 
          className="w-full h-full border-0"
          title="Text Behind Image Editor"
          allow="camera; microphone; clipboard-read; clipboard-write"
        />
      </motion.div>
    </div>
  );
}
