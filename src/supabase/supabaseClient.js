
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Provided credentials
const DEFAULT_URL = 'https://ovmfxhivjxfxdgahxuea.supabase.co';
const DEFAULT_KEY = 'sb_publishable_mttgVbvASiVNKoSo-mWJRA_W8aHpXjs';

const supabaseUrl = DEFAULT_URL;
const supabaseAnonKey = DEFAULT_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
