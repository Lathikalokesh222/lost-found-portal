import { createContext, useEffect, useState, type ReactNode, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const { data: { user: currentUser }, error } = await supabase.auth.getUser();
      if (error) throw error;
      setUser(currentUser);
    } catch (err) {
      console.error('Error refreshing user:', err);
      setUser(null);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Error during logout:', err);
    }
  }, []);

  useEffect(() => {
    // Initialize session and user status
    const initializeAuth = async () => {
      try {
        const { data: { session: activeSession }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(activeSession);
        setUser(activeSession?.user ?? null);
      } catch (err) {
        console.error('Error getting initial session:', err);
        setSession(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen to session state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, session, loading, isAuthenticated, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
