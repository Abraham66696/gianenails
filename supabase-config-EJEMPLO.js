// ⚠️ IMPORTANTE: Reemplaza estos valores con los de tu proyecto Supabase
// Ve a: https://supabase.com → Tu proyecto → Settings → API

// PASO 1: Obtén estos valores de Supabase
const SUPABASE_URL = 'https://xxxxxxxxx.supabase.co';  // Reemplaza con tu Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';  // Reemplaza con tu Anon Key

// EJEMPLO DE CÓMO SE VE COMPLETO:
/*
const SUPABASE_URL = 'https://abcd1234xyz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2QxMjM0eHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzODk4NzcsImV4cCI6MTcyMTkyNTg3N30.P-QFGJz1...';
*/

// Inicializar cliente de Supabase
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log('✅ Supabase configurado correctamente');
