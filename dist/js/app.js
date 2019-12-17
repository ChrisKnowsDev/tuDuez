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
  // Edit task
  taskList.addEventListener('click', editTask);
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
    // Create  delete link
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item';
    // Link html
    link.innerHTML = '<i class="fas fa-trash"></i>';
    // Creat edit link
    const editLink = document.createElement('a');
    // Edit link class
    editLink.className = 'edit-item';
    // Edit link html
    editLink.innerHTML = '<i class="fas fa-edit"></i>';
    // Create span to append i elements 
    const span = document.createElement('span');
    // Add class
    span.className = 'icon-span'
    // Append i to span element
    span.appendChild(editLink);
    span.appendChild(link);

    li.appendChild(span);
    // Append li to ul 
    taskList.appendChild(li);
  });
}


// Function add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('You must enter a task first');
  }

  // Create li
  const li = document.createElement('li');
  // Add class
  li.className = 'list-item';
  // Create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create  delete link
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item';
  // Link html
  link.innerHTML = '<i class="fas fa-trash"></i>';
  // Creat edit link
  const editLink = document.createElement('a');
  // Edit link class
  editLink.className = 'edit-item';
  // Edit link html
  editLink.innerHTML = '<i class="fas fa-edit"></i>';
  // Create span to append i elements 
  const span = document.createElement('span');
  // Add class
  span.className = 'icon-span'
  // Append i to span element
  span.appendChild(editLink);
  span.appendChild(link);

  li.appendChild(span);
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
  // console.log(e.target);
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }

  // Delete from ls
  deleteTasksFromLocalStorage(e.target.parentElement.parentElement.parentElement);
}

// Edit task
function editTask(e) {
  if (e.target.parentElement.classList.contains('edit-item')) {

  }
}

// Function to delete item from local storage when deleted from ui
function deleteTasksFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function clear tasks
function clearTasks() {
  if (confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.firstChild.remove();
    }
  }

  // Clear task from ls
  clearTasksFromLocalStorage();
}

// Functio to clear tasks from ls
function clearTasksFromLocalStorage() {
  localStorage.clear();
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