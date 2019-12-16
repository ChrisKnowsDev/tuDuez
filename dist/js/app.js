const form = document.getElementById('task-form');
const taskList = document.getElementById('collection');
const taskInput = document.getElementById('task-input');
const submitBtn = document.getElementById('submit');
const filter = document.getElementById('filter');
const clearBtn = document.getElementById('clear-btn');

// Load all event listeners
loadAllEventListeners();

function loadAllEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add task
  form.addEventListener('submit', addTask);
  // Delete task
  taskList.addEventListener('click', deleteTask);
  // Clear tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task) => {
    // Create li
    const li = document.createElement('li');
    // Add class
    li.className = 'list-item';
    // Create textnode and append to li
    li.appendChild(document.createTextNode(task));
    // Create link
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item';
    // Link html
    link.innerHTML = '<i class="fas fa-trash"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul 
    taskList.appendChild(li);
  });
}


// Function add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('You must enter a task first')
  }

  // Create li
  const li = document.createElement('li');
  // Add class
  li.className = 'list-item';
  // Create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create link
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item';
  // Link html
  link.innerHTML = '<i class="fas fa-trash"></i>';
  // Append link to li
  li.appendChild(link);
  // Append li to ul 
  taskList.appendChild(li);

  // Store task in ls
  storeTaskInLocalStorage(taskInput.value);

  // Clear task input after submit
  taskInput.value = '';

  e.preventDefault();
}

// Function to store task in ls
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function delete task
function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

// Function clear tasks
function clearTasks() {
  if (confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
    }
  }
}

// Function filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.list-item').forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = 'flex';
    } else {
      task.style.display = 'none';
    }
  });
}