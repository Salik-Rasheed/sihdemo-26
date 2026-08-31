import { createClient } from '@supabase/supabase-js';

// Resolve Supabase URL from Vite or Next.js environment variables with fallback
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 
  'https://dtiykzhasuxpiodjemow.supabase.co';

const supabaseKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  'sb_publishable_JDLh2UVBgzv3xbvJjWDgnw_vQL-2TbD';

export const supabase = createClient(supabaseUrl, supabaseKey);
