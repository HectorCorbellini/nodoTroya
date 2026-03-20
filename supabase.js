import { createClient } from '@supabase/supabase-js'

// Environment variables will be configured in Netlify
// Soporta tanto variables estándar de Node.js (Servidor) como prefijadas por Vite (Cliente)
const supabaseUrl = (typeof process !== 'undefined' && process.env?.SUPABASE_URL) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL);
const supabaseAnonKey = (typeof process !== 'undefined' && process.env?.SUPABASE_ANON_KEY) ||
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Sensors will use fallback/placeholder data.')
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null
