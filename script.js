// Manejar Comentarios
document.getElementById('commentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, message }),
    });

    loadComments();
});

// Cargar Comentarios
async function loadComments() {
    const response = await fetch('http://localhost:5000/comments');
    const comments = await response.json();
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = comments.map(comment => `<p><strong>${comment.username}</strong>: ${comment.message}</p>`).join('');
}

loadComments();

// Manejar Usuarios
document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('user').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    alert('Usuario registrado!');
    document.getElementById('userForms').classList.add('hidden');
});

// Manejar Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUser').value;
    const password = document.getElementById('loginPassword').value;

    // Aquí puedes agregar lógica para verificar el inicio de sesión

    alert('Usuario autenticado!');
    document.getElementById('userForms').classList.add('hidden');
});

// Mostrar/Ocultar formularios de usuario
document.getElementById('registerButton').addEventListener('click', () => {
    document.getElementById('registerForm').classList.remove('hidden');
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('userForms').classList.toggle('hidden');
});

document.getElementById('loginButton').addEventListener('click', () => {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('userForms').classList.toggle('hidden');
});

// Manejar Tareas
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task').value;

    await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
    });

    loadTasks();
});

// Cargar Tareas
async function loadTasks() {
    const response = await fetch('http://localhost:5000/tasks');
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
        <li>
            ${task.title} <button onclick="deleteTask('${task._id}')">Eliminar</button>
        </li>
    `).join('');
}

loadTasks();

// Eliminar Tarea
async function deleteTask(id) {
    await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE',
    });

    loadTasks();
}

// Cargar Comentarios
async function loadComments() {
    const response = await fetch('http://localhost:5000/comments');
    const comments = await response.json();
    const commentsDiv = document.getElementById('comments');
    commentsDiv.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <p><strong>${comment.username}</strong>: ${comment.message}</p>
        </div>
    `).join('');
}

loadComments();
