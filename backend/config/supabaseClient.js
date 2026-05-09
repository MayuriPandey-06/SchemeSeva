import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'placeholder-key';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY.includes('PASTE_YOUR')) {
  console.warn('⚠️  WARNING: Supabase credentials not found or invalid. Features will fail until you add them to backend/.env');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});
