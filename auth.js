// Funciones de Autenticación con Supabase

const ADMIN_EMAILS = ['admin@gline.com', 'giane@nails.com'];

async function getUserProfile(userId) {
    if (!userId) return null;

    const { data, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

    if (error && error.code !== 'PGRST116') {
        console.error('Error al leer el perfil del usuario:', error);
    }

    return data;
}

async function ensureUserProfile(user) {
    if (!user?.id) return null;

    const existingProfile = await getUserProfile(user.id);
    if (existingProfile) {
        return existingProfile;
    }

    const role = ADMIN_EMAILS.includes(user.email?.toLowerCase()) ? 'admin' : 'user';

    const { data, error } = await supabaseClient
        .from('profiles')
        .insert([{ id: user.id, email: user.email, role }])
        .select()
        .single();

    if (error) {
        if (error.code !== '23505') {
            console.error('No se pudo crear el perfil del usuario:', error);
        }
        return null;
    }

    return data;
}

function isAdminUser(userOrProfile) {
    if (!userOrProfile) return false;

    const role = userOrProfile.role || userOrProfile.user_metadata?.role || userOrProfile.app_metadata?.role;
    const email = userOrProfile.email?.toLowerCase();

    return role === 'admin' || ADMIN_EMAILS.includes(email);
}

async function registerWithEmail(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    role: 'user'
                }
            }
        });

        if (error) throw error;

        if (data.user) {
            await ensureUserProfile(data.user);
        }

        alert('¡Cuenta creada! Si la confirmación por correo está habilitada, revisá tu casilla.');
        return data;
    } catch (error) {
        alert('Error al registrarse: ' + error.message);
        console.error('Error:', error);
    }
}

async function loginWithEmail(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        if (data.user) {
            await ensureUserProfile(data.user);
        }

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
    try {
        await supabaseClient.auth.signOut();
    } catch (error) {
        console.error('Error al cerrar sesión en Supabase:', error);
    } finally {
        window.location.reload();
    }
}

async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        if (error) throw error;

        if (user) {
            await ensureUserProfile(user);
        }

        return user;
    } catch (error) {
        console.error('No se pudo obtener el usuario actual:', error);
        return null;
    }
}

async function getCurrentUserProfile() {
    const user = await getCurrentUser();
    if (!user) return null;
    return await getUserProfile(user.id);
}

async function changeUserPassword(newPassword) {
    try {
        const { data, error } = await supabaseClient.auth.updateUser({ password: newPassword });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        throw error;
    }
}
