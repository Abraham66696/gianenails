// Funciones para manejar Turnos

async function saveTurno(userId, fecha, hora, servicio) {
    try {
        const { data, error } = await supabaseClient
            .from('turnos')
            .insert([
                {
                    user_id: userId,
                    fecha: fecha,
                    hora: hora,
                    servicio: servicio,
                    estado: 'confirmado',
                    created_at: new Date()
                }
            ]);

        if (error) throw error;

        alert('¡Turno confirmado!');
        return data;
    } catch (error) {
        alert('Error al reservar turno: ' + error.message);
        console.error('Error:', error);
    }
}

async function getTurnosUsuario(userId) {
    try {
        const { data, error } = await supabaseClient
            .from('turnos')
            .select('*')
            .eq('user_id', userId)
            .order('fecha', { ascending: true });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error al obtener turnos:', error);
        return [];
    }
}

async function cancelarTurno(turnoId) {
    try {
        const { data, error } = await supabaseClient
            .from('turnos')
            .update({ estado: 'cancelado' })
            .eq('id', turnoId);

        if (error) throw error;

        alert('Turno cancelado');
        return data;
    } catch (error) {
        alert('Error al cancelar turno: ' + error.message);
    }
}

async function getTurnosDisponibles(fecha) {
    try {
        const { data, error } = await supabaseClient
            .from('turnos')
            .select('hora')
            .eq('fecha', fecha)
            .eq('estado', 'confirmado');

        if (error) throw error;

        const horariosOcupados = data.map(t => t.hora);
        const horariosDisponibles = ['08:00', '10:00', '12:00', '13:30', '15:30']
            .filter(h => !horariosOcupados.includes(h));

        return horariosDisponibles;
    } catch (error) {
        console.error('Error:', error);
        return ['08:00', '10:00', '12:00', '13:30', '15:30'];
    }
}
