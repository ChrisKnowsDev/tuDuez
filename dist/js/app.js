const form = document.getElementById('task-form');
const taskList = document.getElementById('collection');
const taskInput = document.getElementById('task-input');
const submitBtn = document.getElementById('submit');
const filter = document.getElementById('filter');
const clearBtn = document.getElementById('clear-btn');

// Load all event listeners
loadAllEventListeners();

function loadAllEventListeners() {
  // Add task
  form.addEventListener('submit', addTask);
  // Delete task
  taskList.addEventListener('click', deleteTask);
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

  // Clear task input after submit
  taskInput.value = '';

  e.preventDefault();
}

// Function delete task
function deleteTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
}