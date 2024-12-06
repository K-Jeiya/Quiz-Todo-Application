const startBtn = document.getElementById('start-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const todoScreen = document.getElementById('todo-screen');
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const deleteAllBtn = document.getElementById('delete-all-btn');

// Start Button Event
startBtn.addEventListener('click', () => {
  welcomeScreen.style.opacity = '0';
  welcomeScreen.style.transform = 'scale(0.8)';
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    todoScreen.style.display = 'block';
    setTimeout(() => {
      todoScreen.style.opacity = '1';
      todoScreen.style.transform = 'scale(1)';
    }, 100);
  }, 500);
});

// Add Todo
addBtn.addEventListener('click', () => {
  const todoText = todoInput.value.trim();
  if (todoText === '') return; // Empty todo validation

  if (todoList.children.length >= 10) {
    alert('You can only add 10 tasks!');
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="todo-text">${todoText}</span>
    <div class="todo-icons">
      <i class="fas fa-check-circle"></i>
      <i class="fas fa-edit"></i>
      <i class="fas fa-trash"></i>
    </div>
  `;
  todoList.appendChild(li);
  todoInput.value = '';

  // Add scroll bar if max todos exceeded
  if (todoList.children.length > 3) {
    todoList.style.overflowY = 'scroll';
  }
});

// Delete All Todos
deleteAllBtn.addEventListener('click', () => {
  todoList.innerHTML = '';
  todoList.style.overflowY = 'hidden'; // Remove scroll bar if no todos
});

// Edit or Delete Single Todo
todoList.addEventListener('click', (e) => {
  const li = e.target.parentElement.parentElement;

  // Mark as completed
  if (e.target.classList.contains('fa-check-circle')) {
    li.classList.toggle('completed'); // Toggle completed class for strikethrough
  }

  // Edit Todo
  else if (e.target.classList.contains('fa-edit')) {
    const todoText = li.querySelector('.todo-text');
    todoInput.value = todoText.textContent.trim();
    e.target.classList.replace('fa-edit', 'fa-save'); // Change icon to save
  }

  // Save Edited Todo
  else if (e.target.classList.contains('fa-save')) {
    const todoText = li.querySelector('.todo-text');
    todoText.textContent = todoInput.value.trim();
    e.target.classList.replace('fa-save', 'fa-edit'); // Change icon back to edit
    todoInput.value = ''; // Clear input
  }

  // Delete Todo
  else if (e.target.classList.contains('fa-trash')) {
    li.remove();

    // Remove scroll bar if todos are fewer than 3
    if (todoList.children.length <= 4) {
      todoList.style.overflowY = 'hidden';
    }
  }
});
