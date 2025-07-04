import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/auth'; // No need to import type AuthUser
import { apiRequest } from '@/lib/queryClient';
import type { User } from '@shared/schema';
import type { User as SupabaseUser } from '@supabase/supabase-js';

// 🔐 Define context shape
interface AuthContextType {
  user: SupabaseUser | null;
  appUser: User | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [appUser, setAppUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🔁 Create or fetch app-specific user
  const createOrGetAppUser = async (authUser: SupabaseUser) => {
    try {
      const response = await apiRequest('POST', '/api/user', {
        email: authUser.email,
        username:
          authUser.user_metadata?.full_name || authUser.email?.split('@')[0],
        supabaseId: authUser.id,
      });
      const userData = await response.json();
      setAppUser(userData);
    } catch (error) {
      console.error('❌ Error creating/getting app user:', error);
    }
  };

  // 🔄 Refresh user from Supabase session
  const refreshUser = async () => {
    console.log('🔁 refreshUser triggered');
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;

      const authUser = data.user;
      console.log('✅ Supabase user fetched:', authUser);

      if (authUser) {
        setUser(authUser);
        if (authUser.email) {
          await createOrGetAppUser(authUser);
        } else {
          console.warn('⚠️ Missing email on user');
          setAppUser(null);
        }
      } else {
        console.warn('⚠️ No user returned');
        setUser(null);
        setAppUser(null);
      }
    } catch (error) {
      console.error('❌ Error refreshing user:', error);
      setUser(null);
      setAppUser(null);
    } finally {
      console.log('🎉 Done loading');
      setIsLoading(false);
    }
  };

  // 📡 Setup listener for auth changes
  useEffect(() => {
    console.log('🌀 useEffect → refreshUser + subscribe to auth changes');
    refreshUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('⚡ Auth event:', event);

        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          if (session.user.email) {
            await createOrGetAppUser(session.user);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setAppUser(null);
        }

        // ❌ DO NOT update isLoading here
      }
    );

    return () => {
      console.log('🧹 Cleanup auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  // 🔐 Google login
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth`,
      },
    });

    if (error) throw error;
  };

  // 🚪 Logout
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setAppUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        appUser,
        isLoading,
        signInWithGoogle,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 🪝 Hook to access auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
