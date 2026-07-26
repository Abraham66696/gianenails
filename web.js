let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;
let bookedAppointment = null;
let currentUser = null;
const horarios = ['08:00', '10:00', '12:00', '13:30', '15:30'];

// Verificar usuario al cargar
async function checkUser() {
    currentUser = await getCurrentUser();
    if (currentUser) {
        document.getElementById('registerBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
    } else {
        document.getElementById('registerBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
    }
}

function showSection(sectionId, button) {
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    if (button) {
        button.classList.add('active');
    }
}

function generateCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthYearElement = document.getElementById('monthYear');
    const calendarGrid = document.getElementById('calendar');
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    monthYearElement.textContent = `${months[month]} ${year}`;
    calendarGrid.innerHTML = '';

    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day calendar-day-empty';
        calendarGrid.appendChild(emptyCell);
    }

    for (let i = 1; i <= lastDay; i++) {
        const day = document.createElement('div');
        const date = new Date(year, month, i);
        date.setHours(0, 0, 0, 0);

        const isSelectable = date >= today;

        day.className = isSelectable ? 'calendar-day' : 'calendar-day disabled';
        day.textContent = i;

        if (isSelectable) {
            day.addEventListener('click', function () {
                selectDate(this, date);
            });
        } else {
            day.style.cursor = 'not-allowed';
        }

        calendarGrid.appendChild(day);
    }
}

function selectDate(element, date) {
    if (bookedAppointment) {
        alert('Ya tenés un turno reservado. No podés pedir otro.');
        return;
    }

    document.querySelectorAll('.calendar-day.selected').forEach(day => day.classList.remove('selected'));
    element.classList.add('selected');
    selectedDate = date;
    showHorarios();
}

function showHorarios() {
    const horariosContainer = document.getElementById('horariosContainer');
    const horariosGrid = document.getElementById('horariosGrid');
    const horariosTitle = document.getElementById('horariosTitle');

    if (!selectedDate) {
        horariosContainer.style.display = 'none';
        return;
    }

    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    horariosTitle.textContent = `Horarios disponibles para ${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`;
    horariosGrid.innerHTML = '';

    horarios.forEach(hora => {
        const btn = document.createElement('button');
        btn.className = 'horario-btn';
        btn.textContent = hora;
        btn.addEventListener('click', function () {
            selectTurno(this, hora);
        });
        horariosGrid.appendChild(btn);
    });

    horariosContainer.style.display = 'block';
}

function selectTurno(element, hora) {
    document.querySelectorAll('.horario-btn.selected').forEach(btn => btn.classList.remove('selected'));
    element.classList.add('selected');
    selectedTime = hora;
}

document.addEventListener('DOMContentLoaded', function () {
    checkUser();
    generateCalendar();

    document.getElementById('prevMonth').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
    });

    document.getElementById('nextMonth').addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
    });

    // Los botones de autenticación ya están manejados arriba

    document.getElementById('registerBtn').addEventListener('click', async function () {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Completa correo y contraseña para registrarte.');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        await registerWithEmail(email, password);
        checkUser();
    });

    document.getElementById('loginGoogle').addEventListener('click', async function () {
        await loginWithGoogle();
        checkUser();
    });

    document.getElementById('loginFacebook').addEventListener('click', async function () {
        await loginWithFacebook();
        checkUser();
    });

    document.getElementById('logoutBtn').addEventListener('click', function () {
        logout();
    });

    document.getElementById('confirmarTurno').addEventListener('click', async function () {
        const servicio = document.getElementById('servicioSelect').value;

        if (!selectedDate || !selectedTime || !servicio) {
            alert('Seleccioná fecha, horario y servicio para confirmar el turno.');
            return;
        }

        if (!currentUser) {
            alert('Debes iniciar sesión para reservar un turno.');
            return;
        }

        const fechaFormato = selectedDate.toISOString().split('T')[0];
        await saveTurno(currentUser.id, fechaFormato, selectedTime, servicio);
        bookedAppointment = { fecha: fechaFormato, hora: selectedTime, servicio };
    });

    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');

    if (fileInput) {
        fileInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    preview.src = event.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    document.getElementById('uploadBtn').addEventListener('click', async function () {
        if (!currentUser) {
            alert('Debes iniciar sesión para subir imágenes.');
            return;
        }

        if (fileInput && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const imageUrl = await uploadImage(file, currentUser.id);
            if (imageUrl) {
                preview.src = imageUrl;
                alert('Diseño cargado correctamente.');
            }
        } else {
            alert('Seleccioná una imagen para ver el diseño.');
        }
    });

    document.querySelectorAll('.event-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            alert('Reserva enviada. Pronto te vamos a avisar por contacto.');
        });
    });

    document.getElementById('confirmPayment').addEventListener('click', function () {
        const metodoPago = document.querySelector('input[name="pago"]:checked');
        const monto = document.getElementById('monto').value;

        if (metodoPago && monto) {
            const metodos = {
                tarjeta: 'Tarjeta de Crédito/Débito',
                mercadopago: 'Mercado Pago',
                efectivo: 'Efectivo'
            };
            alert(`Pago confirmado\nMétodo: ${metodos[metodoPago.value]}\nMonto: $${monto}`);
        } else {
            alert('Seleccioná un método de pago y un monto.');
        }
    });
});
