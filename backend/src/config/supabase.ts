import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log("--- Supabase Env Check ---");
console.log("URL exists:", !!supabaseUrl);
console.log("Key exists:", !!supabaseKey);
if (supabaseUrl) console.log("URL starts with:", supabaseUrl.substring(0, 5));
console.log("--------------------------");

if (!supabaseUrl || !supabaseKey) {
  throw new Error('❌ Missing Supabase Environment Variables in .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);