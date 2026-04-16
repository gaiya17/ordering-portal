/**
 * Supabase Configuration Module
 * Initializes and exports the Supabase client for database operations.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Retrieve Supabase configuration from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Validate required environment variables
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase Environment Variables in .env file.');
}

// Create and export Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseKey);