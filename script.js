const inputTask = document.querySelector('.input-content input');
const btnAdd = document.getElementById('add-button');
const containerTasks = document.querySelector('.container-tasks');
const pendingCounter = document.getElementById('pending-tasks');
const filterButtons = document.querySelectorAll('.content-funnel button');

let tasks = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];
let currentFilter = 'Todas';

function renderTasks() {
    containerTasks.innerHTML = ''; 

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'Ativas') return !task.completed;
        if (currentFilter === 'Concluidas') return task.completed;
        return true; 
    });

    filteredTasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        
        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <p style="${task.completed ? 'text-decoration: line-through; color: #9ca3af;' : ''}">${task.text}</p>
            <svg onclick="deleteTask(${index})" style="cursor:pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-trash" viewBox="0 0 16 16">
                        <path
                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
        `;
        containerTasks.appendChild(taskDiv);
    });

    updateCounter();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}

function addTask() {
    const text = inputTask.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        inputTask.value = '';
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function updateCounter() {
    const pending = tasks.filter(t => !t.completed).length;
    pendingCounter.innerText = `${pending} tarefa${pending !== 1 ? 's' : ''} pendente${pending !== 1 ? 's' : ''}`;
}

btnAdd.addEventListener('click', addTask);

inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
            b.style.backgroundColor = 'white';
            b.style.color = '#374151';
        });
        btn.style.backgroundColor = '#8763f1';
        btn.style.color = 'white';

        currentFilter = btn.innerText;
        renderTasks();
    });
});

renderTasks();