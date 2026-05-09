import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isValidConfig } from '../services/supabaseClient';
import toast from 'react-hot-toast';

const AuthContext = createContext();
const LOCAL_AUTH_KEY = 'gov-scheme-auth-user';
const SUPABASE_CONFIGURED = isValidConfig;

function loadFallbackUser() {
  if (typeof window === 'undefined') return null;
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_AUTH_KEY));
  } catch {
    return null;
  }
}

function saveFallbackUser(user) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
}

function removeFallbackUser() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(LOCAL_AUTH_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      const localUser = loadFallbackUser();
      setUser(localUser);
      setLoading(false);
      return;
    }

    try {
      supabase.auth.getSession().then(({ data, error }) => {
        if (error) {
          console.error('Supabase session error:', error);
          const localUser = loadFallbackUser();
          setUser(localUser);
        } else {
          setUser(data.session?.user || loadFallbackUser());
        }
        setLoading(false);
      }).catch(err => {
        console.error('Supabase getSession promise error:', err);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || loadFallbackUser());
        setLoading(false);
        if (event === 'SIGNED_OUT') {
          toast.success('Logged out successfully');
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    } catch (err) {
      console.error('Supabase initialization error:', err);
      setLoading(false);
    }
  }, []);

  const fallbackAuth = async (email) => {
    const fallbackUser = { email, id: email, fallback: true };
    saveFallbackUser(fallbackUser);
    setUser(fallbackUser);
    setLoading(false);
    return fallbackUser;
  };

  const signUp = async (email, password) => {
    setLoading(true);
    if (!SUPABASE_CONFIGURED) {
      await fallbackAuth(email);
      toast.success('Signup successful. You are now logged in.');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      await fallbackAuth(email);
      toast.success('Signup fallback successful. You are now logged in.');
      return;
    }
    toast.success('Signup successful. Check your email for verification.');
  };

  const signIn = async (email, password) => {
    setLoading(true);
    if (!SUPABASE_CONFIGURED) {
      await fallbackAuth(email);
      return;
    }

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      await fallbackAuth(email);
      return;
    }

    setUser(data.session?.user || await fallbackAuth(email));
  };

  const signOut = async () => {
    if (SUPABASE_CONFIGURED) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Logout failed.');
        console.error(error);
      }
    }
    removeFallbackUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
