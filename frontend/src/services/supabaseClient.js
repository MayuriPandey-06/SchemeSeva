import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Clean the URL if it has /rest/v1/ appended (common user error)
const cleanUrl = supabaseUrl?.replace(/\/rest\/v1\/?$/, '');

export const isValidConfig = cleanUrl && 
                     supabaseAnonKey && 
                     cleanUrl.startsWith('https://') && 
                     supabaseAnonKey.startsWith('eyJ');

if (!isValidConfig) {
  console.warn('Supabase environment variables are missing or invalid. Auth will run in fallback mode.');
}

// Create the client. If invalid, we'll create a dummy one that doesn't throw on auth calls
export const supabase = isValidConfig 
  ? createClient(cleanUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ 
          data: { 
            session: { 
              user: { email: 'demo@example.com', id: 'demo-user-123', fallback: true },
              access_token: 'mock-token'
            } 
          }, 
          error: null 
        }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
        signUp: async () => ({ error: new Error('Supabase not configured') }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ order: () => ({ data: [], error: null }) }),
        insert: () => ({ error: new Error('Supabase not configured') }),
        update: () => ({ error: new Error('Supabase not configured') }),
      })
    };

