import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function Auth() {
  const [, setLocation] = useLocation();
  const { user, appUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user && appUser) {
        if (appUser.hasPaid) {
          setLocation('/app');
        } else {
          setLocation('/checkout');
        }
      } else {
        setLocation('/');
      }
    }
  }, [user, appUser, isLoading, setLocation]);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-slate-400">Completing authentication...</p>
      </div>
    </div>
  );
}
