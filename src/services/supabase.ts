import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

let supabaseClient: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase no está configurado: define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en .env');
  supabaseClient = {
    auth: {
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase no configurado') }),
      signUp: async () => ({ data: null, error: new Error('Supabase no configurado') }),
      signOut: async () => ({ data: null, error: new Error('Supabase no configurado') }),
      getSession: async () => ({ data: { session: null }, error: null }),
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: () => ({
      select: async () => ({ data: null, error: new Error('Supabase no configurado') }),
      update: async () => ({ data: null, error: new Error('Supabase no configurado') })
    })
  };
} else {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      detectSessionInUrl: true
    }
  });
}

export const supabase = supabaseClient;
