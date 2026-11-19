import { createClient } from '@supabase/supabase-js'

// Médias (images, vidéos) : projet 1
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Database (tables, fonctions SQL, temps réel) : projet 2
export const supabaseDb = createClient(
  import.meta.env.VITE_DB_SUPABASE_URL,
  import.meta.env.VITE_DB_SUPABASE_ANON_KEY
)