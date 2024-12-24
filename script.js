const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Check if the task input is not empty
function checkInput() {
    return taskInput.value.trim() !== '';
}

// Add the task to the list
function addTask(event, taskText) {
    event.preventDefault();
    const taskElement = createTaskElement(taskText);
    taskList.appendChild(taskElement);
    taskInput.value = '';
}


// Create the task element
function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');

    const taskContent = document.createElement('span');
    taskContent.classList.add('task-content');
    taskContent.textContent = taskText;

    const deleteButton = document.createElement('input');
    deleteButton.type = 'button';
    deleteButton.classList.add('delete-button');
    deleteButton.value = 'Delete';
    deleteButton.addEventListener('click', deleteTask);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('check-box');;
    checkBox.addEventListener('change', crossOutTask);

    taskItem.appendChild(checkBox);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    return taskItem;
}

// Add the delete task function
function deleteTask(event) {
    event.preventDefault();
    const taskElement = event.target.closest('.task-item');
    if (taskElement) {
        taskList.removeChild(taskElement);
        console.log('Task deleted');
    }
}

// Add the event listener
addTaskButton.addEventListener('click', (event) => {
    if (checkInput()) {
        addTask(event, taskInput.value.trim());
    }
});

// Add the event listener for the enter key
taskInput.addEventListener('keypress', (event) => {
    if (checkInput() && event.key === 'Enter') {
        addTask(event, taskInput.value.trim());
    }
});

// cross out the task when the checkbox is checked
function crossOutTask(event) {
    event.preventDefault();
    const taskElement = event.target.closest('.task-item');
    const textSpan = taskElement.querySelector('span');
    if (event.target.checked) {
        taskElement.classList.toggle('completed');
        textSpan.classList.toggle('cross-out', 'active');
    }
    else {
        taskElement.classList.remove('completed');
        textSpan.classList.remove('cross-out', 'active');
    }
}

