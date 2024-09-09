// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const showAll = document.getElementById('showAll');
const showCompleted = document.getElementById('showCompleted');
const showPending = document.getElementById('showPending');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks(filter = 'all') {
    taskList.innerHTML = ''; // Clear task list
    let filteredTasks = tasks;

    // Apply filters
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `flex justify-between items-center bg-gray-100 p-2 my-2 rounded-lg ${task.completed ? 'line-through' : ''}`;
        
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <div class="flex">
                <button onclick="toggleTask(${index})" class="bg-green-500 text-white px-2 rounded-lg">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})" class="bg-yellow-500 text-white px-2 mx-2 rounded-lg">Edit</button>
                <button onclick="deleteTask(${index})" class="bg-red-500 text-white px-2 rounded-lg">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });

    // Save to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

// Edit task function
function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        renderTasks();
    }
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Delete task function
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Filter functions
showAll.addEventListener('click', () => renderTasks('all'));
showCompleted.addEventListener('click', () => renderTasks('completed'));
showPending.addEventListener('click', () => renderTasks('pending'));

// Event listener for adding tasks
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();
