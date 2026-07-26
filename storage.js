// Funciones para subir imágenes

async function uploadImage(file, userId) {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}-${Date.now()}.${fileExt}`;

        const { data, error } = await supabaseClient.storage
            .from('diseno')
            .upload(`public/${fileName}`, file);

        if (error) throw error;

        // Obtener URL pública
        const { data: { publicUrl } } = supabaseClient.storage
            .from('diseno')
            .getPublicUrl(`public/${fileName}`);

        // Guardar referencia en base de datos
        const { error: dbError } = await supabaseClient
            .from('imagenes')
            .insert([
                {
                    user_id: userId,
                    file_name: fileName,
                    url: publicUrl,
                    uploaded_at: new Date()
                }
            ]);

        if (dbError) throw dbError;

        return publicUrl;
    } catch (error) {
        alert('Error al subir imagen: ' + error.message);
        console.error('Error:', error);
    }
}

async function getUltimaImagen(userId) {
    try {
        const { data, error } = await supabaseClient
            .from('imagenes')
            .select('url')
            .eq('user_id', userId)
            .order('uploaded_at', { ascending: false })
            .limit(1);

        if (error) throw error;
        return data[0]?.url || null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
