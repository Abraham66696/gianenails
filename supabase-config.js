// Configuración de Supabase
// ✅ Conectado con proyecto gianenails
const SUPABASE_URL = 'https://xozsxkskggtkrmstjncp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xMzxO3g4PuMqxtcChwKbwg_b66e8XH7';

// Inicializar cliente de Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
