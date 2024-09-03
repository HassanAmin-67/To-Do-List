document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText
        };
        addTaskToList(task);
        saveTask(task);
        taskInput.value = '';
    });

    // Add task to the list
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        li.innerHTML = `
            ${task.text}
            <div>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        `;

        // Edit task
        li.querySelector('.edit').addEventListener('click', () => {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null) {
                task.text = newText;
                li.firstChild.textContent = newText;
                updateTask(task);
            }
        });

        // Delete task
        li.querySelector('.delete').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                li.remove();
                deleteTask(task.id);
            }
        });

        taskList.appendChild(li);
    }

    // Save task to localStorage
    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Update task in localStorage
    function updateTask(updatedTask) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Delete task from localStorage
    function deleteTask(taskId) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task));
    }
});
