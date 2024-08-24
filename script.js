// Toggle Password Visibility
function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Login Form Handling
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        window.location.href = 'dashboard.html';
    } else {
        alert('Correo o contraseña incorrectos. Redirigiendo al registro.');
        window.location.href = 'register.html';
    }
});

// Registration Form Handling
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === email)) {
        alert('El correo ya está registrado.');
    } else {
        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registro exitoso. Redirigiendo al login.');
        window.location.href = 'index.html';
    }
});

// Logout Function
function logout() {
    if (confirm('¿Estás seguro de salir?')) {
        window.location.href = 'index.html';
    }
}

// Initialize Dashboard
if (document.getElementById('pendingAppointments')) {
    // Dummy data for demonstration
    const pendingAppointments = [
        { title: 'Cita 1', addedBy: 'Usuario', time: '10:00', date: '08/08/2024', completed: false },
    ];
    const completedAppointments = [];

    function renderAppointments() {
        const pendingTable = document.getElementById('pendingTable').getElementsByTagName('tbody')[0];
        pendingTable.innerHTML = '';
        pendingAppointments.forEach((appt, index) => {
            const row = pendingTable.insertRow();
            row.insertCell(0).textContent = appt.title;
            row.insertCell(1).textContent = appt.addedBy;
            row.insertCell(2).textContent = appt.time;
            row.insertCell(3).textContent = appt.date;
            row.insertCell(4).innerHTML = `<input type="checkbox" ${appt.completed ? 'checked' : ''} onchange="markAsDone(${index})">`;
            row.insertCell(5).innerHTML = `<button onclick="updateAppointment(${index})">Actualizar</button>`;
            row.insertCell(6).innerHTML = `<button onclick="deleteAppointment(${index})">Borrar</button>`;
        });

        const completedTable = document.getElementById('completedTable').getElementsByTagName('tbody')[0];
        completedTable.innerHTML = '';
        completedAppointments.forEach((appt, index) => {
            const row = completedTable.insertRow();
            row.insertCell(0).textContent = appt.title;
            row.insertCell(1).textContent = appt.date;
            row.insertCell(2).textContent = appt.time;
            row.insertCell(3).textContent = appt.description;
            row.insertCell(4).innerHTML = `<button onclick="editCompletedAppointment(${index})">Modificar</button>`;
            row.insertCell(5).innerHTML = `<button onclick="deleteCompletedAppointment(${index})">Eliminar</button>`;
        });
    }

    function addAppointment() {
        const title = prompt('Ingrese el título de la cita:');
        const addedBy = 'Usuario'; // Placeholder for actual user
        const time = prompt('Ingrese la hora de la cita:');
        const date = prompt('Ingrese la fecha de la cita (dd/mm/yyyy):');
        pendingAppointments.push({ title, addedBy, time, date, completed: false });
        renderAppointments();
    }

    function markAsDone(index) {
        const completed = confirm('¿La cita se ha realizado?');
        if (completed) {
            const completedDate = prompt('Ingrese la fecha de realización (dd/mm/yyyy):');
            const description = prompt('Ingrese una descripción:');
            completedAppointments.push({
                ...pendingAppointments[index],
                date: completedDate,
                description,
            });
            pendingAppointments.splice(index, 1);
            renderAppointments();
        }
    }

    function updateAppointment(index) {
        const newTitle = prompt('Ingrese el nuevo título de la cita:', pendingAppointments[index].title);
        if (newTitle) {
            pendingAppointments[index].title = newTitle;
            renderAppointments();
        }
    }

    function deleteAppointment(index) {
        if (confirm('¿Está seguro de que desea eliminar esta cita?')) {
            pendingAppointments.splice(index, 1);
            renderAppointments();
        }
    }

    function editCompletedAppointment(index) {
        const newTitle = prompt('Ingrese el nuevo título de la cita realizada:', completedAppointments[index].title);
        if (newTitle) {
            completedAppointments[index].title = newTitle;
            renderAppointments();
        }
    }

    function deleteCompletedAppointment(index) {
        if (confirm('¿Está seguro de que desea eliminar esta cita realizada?')) {
            completedAppointments.splice(index, 1);
            renderAppointments();
        }
    }

    renderAppointments();
}
