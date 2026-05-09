import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in backend/.env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkTables() {
  const tables = ['profiles', 'family_members', 'documents', 'schemes', 'notifications', 'applications'];
  console.log('Checking tables...');
  
  for (const table of tables) {
    const { error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.error(`Table "${table}" error:`, error.message);
    } else {
      console.log(`Table "${table}" exists.`);
    }
  }
}

checkTables();
