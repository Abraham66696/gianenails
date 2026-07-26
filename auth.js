// Funciones de Autenticación con Supabase

async function registerWithEmail(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

        if (error) throw error;

        alert('¡Cuenta creada! Revisa tu correo para confirmar.');
        return data;
    } catch (error) {
        alert('Error al registrarse: ' + error.message);
        console.error('Error:', error);
    }
}

async function loginWithEmail(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        alert('¡Bienvenido!');
        return data;
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
        console.error('Error:', error);
    }
}

async function loginWithGoogle() {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;
    } catch (error) {
        alert('Error al iniciar sesión con Google: ' + error.message);
    }
}

async function loginWithFacebook() {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;
    } catch (error) {
        alert('Error al iniciar sesión con Facebook: ' + error.message);
    }
}

async function logout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) alert('Error al cerrar sesión');
    else location.reload();
}

async function getCurrentUser() {
    const { data: { user } } = await supabaseClient.auth.getUser();
    return user;
}
