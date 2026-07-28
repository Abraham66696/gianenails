// Funciones de autenticación con Supabase y fallback local para demo

const ADMIN_EMAILS = ['admin@gline.com', 'giane@nails.com'];
const DEMO_USERS = {
    'admin@gline.com': { password: 'Admin123!', role: 'admin' },
    'cliente@gline.com': { password: 'Cliente123!', role: 'user' }
};

function getAuthStorageKey() {
    return 'gianenails-auth-state';
}

function readStoredSession() {
    try {
        const raw = localStorage.getItem(getAuthStorageKey());
        return raw ? JSON.parse(raw) : null;
    } catch (error) {
        console.warn('No se pudo leer la sesión guardada:', error);
        return null;
    }
}

function writeStoredSession(session) {
    try {
        localStorage.setItem(getAuthStorageKey(), JSON.stringify(session));
    } catch (error) {
        console.warn('No se pudo guardar la sesión:', error);
    }
}

function clearStoredSession() {
    localStorage.removeItem(getAuthStorageKey());
}

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function buildDemoUser(email, role = 'user') {
    const normalizedEmail = normalizeEmail(email);
    return {
        id: `demo-${normalizedEmail.replace(/[^a-z0-9]/g, '')}`,
        email: normalizedEmail,
        role,
        user_metadata: { role },
        app_metadata: { role }
    };
}

async function getUserProfile(userId) {
    if (!userId) return null;

    const storedSession = readStoredSession();
    if (storedSession?.user?.id === userId) {
        return {
            id: userId,
            email: storedSession.user.email,
            role: storedSession.user.role || 'user'
        };
    }

    if (typeof supabaseClient === 'undefined' || !supabaseClient?.from) return null;

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

    const storedSession = readStoredSession();
    if (storedSession?.user?.id === user.id) {
        return {
            id: user.id,
            email: user.email,
            role: storedSession.user.role || (ADMIN_EMAILS.includes(normalizeEmail(user.email)) ? 'admin' : 'user')
        };
    }

    const existingProfile = await getUserProfile(user.id);
    if (existingProfile) {
        return existingProfile;
    }

    if (typeof supabaseClient === 'undefined' || !supabaseClient?.from) {
        return {
            id: user.id,
            email: user.email,
            role: ADMIN_EMAILS.includes(normalizeEmail(user.email)) ? 'admin' : 'user'
        };
    }

    const role = ADMIN_EMAILS.includes(normalizeEmail(user.email)) ? 'admin' : 'user';

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
    const email = normalizeEmail(userOrProfile.email);

    return role === 'admin' || ADMIN_EMAILS.includes(email);
}

async function registerWithEmail(email, password) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
        throw new Error('Completa correo y contraseña para registrarte.');
    }

    if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres.');
    }

    try {
        if (typeof supabaseClient !== 'undefined' && supabaseClient?.auth?.signUp) {
            const { data, error } = await supabaseClient.auth.signUp({
                email: normalizedEmail,
                password,
                options: {
                    emailRedirectTo: window.location.origin,
                    data: {
                        role: 'user'
                    }
                }
            });

            if (!error && data?.user) {
                await ensureUserProfile(data.user);
                return data;
            }

            if (error) {
                throw error;
            }
        }
    } catch (error) {
        console.warn('No se pudo registrar con Supabase:', error.message);
        throw new Error(getFriendlyAuthError(error, 'register'));
    }

    const demoUser = buildDemoUser(normalizedEmail, 'user');
    writeStoredSession({ user: demoUser, authMethod: 'demo' });
    await ensureUserProfile(demoUser);
    return { user: demoUser, session: { access_token: 'demo' } };
}

async function loginWithEmail(email, password) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
        throw new Error('Completa correo y contraseña para iniciar sesión.');
    }

    try {
        if (typeof supabaseClient !== 'undefined' && supabaseClient?.auth?.signInWithPassword) {
            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: normalizedEmail,
                password
            });

            if (!error && data?.user) {
                await ensureUserProfile(data.user);
                return data;
            }

            if (error) {
                throw error;
            }
        }
    } catch (error) {
        console.warn('No se pudo iniciar sesion con Supabase:', error.message);
        throw new Error(getFriendlyAuthError(error, 'login'));
    }

    const demoEntry = DEMO_USERS[normalizedEmail];
    if (demoEntry && demoEntry.password === password) {
        const demoUser = buildDemoUser(normalizedEmail, demoEntry.role);
        writeStoredSession({ user: demoUser, authMethod: 'demo' });
        await ensureUserProfile(demoUser);
        return { user: demoUser, session: { access_token: 'demo' } };
    }

    throw new Error('Correo o contraseña incorrectos.');
}

function getFriendlyAuthError(error, action) {
    const message = String(error?.message || '').toLowerCase();

    if (message.includes('email not confirmed') || message.includes('not confirmed')) {
        return 'Revisá tu correo y confirmá la cuenta antes de iniciar sesión.';
    }

    if (message.includes('invalid login credentials')) {
        return 'Correo o contraseña incorrectos.';
    }

    if (message.includes('user already registered') || message.includes('already registered')) {
        return 'Ese correo ya está registrado. Probá iniciar sesión.';
    }

    if (message.includes('signup') && message.includes('disabled')) {
        return 'El registro está desactivado en Supabase. Activá Email en Authentication > Providers.';
    }

    return action === 'register'
        ? 'No se pudo crear la cuenta. Revisá la configuración de Supabase.'
        : 'No se pudo iniciar sesión. Revisá la configuración de Supabase.';
}

async function loginWithGoogle() {
    try {
        if (typeof supabaseClient === 'undefined' || !supabaseClient?.auth?.signInWithOAuth) {
            throw new Error('OAuth no está configurado en este entorno.');
        }

        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;
        return data;
    } catch (error) {
        alert('Error al iniciar sesión con Google: ' + error.message);
    }
}

async function loginWithFacebook() {
    try {
        if (typeof supabaseClient === 'undefined' || !supabaseClient?.auth?.signInWithOAuth) {
            throw new Error('OAuth no está configurado en este entorno.');
        }

        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'facebook',
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) throw error;
        return data;
    } catch (error) {
        alert('Error al iniciar sesión con Facebook: ' + error.message);
    }
}

async function logout() {
    try {
        if (typeof supabaseClient !== 'undefined' && supabaseClient?.auth?.signOut) {
            await supabaseClient.auth.signOut();
        }
    } catch (error) {
        console.error('Error al cerrar sesión en Supabase:', error);
    } finally {
        clearStoredSession();
        window.dispatchEvent(new Event('auth:updated'));
    }
}

async function getCurrentUser() {
    const storedSession = readStoredSession();
    if (storedSession?.user) {
        return storedSession.user;
    }

    try {
        if (typeof supabaseClient === 'undefined' || !supabaseClient?.auth?.getUser) {
            return null;
        }

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
        if (typeof supabaseClient === 'undefined' || !supabaseClient?.auth?.updateUser) {
            throw new Error('La actualización de contraseña solo está disponible con Supabase configurado.');
        }

        const { data, error } = await supabaseClient.auth.updateUser({ password: newPassword });
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        throw error;
    }
}
