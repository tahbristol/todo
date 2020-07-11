document.addEventListener('DOMContentLoaded', function(event){
  startTodos();
  fetchTodos();
})

function startTodos(){
  let addButton = document.getElementById('addTodoBtn');
  addButton.addEventListener('click', function (e) {
    let todo = document.getElementById('todoText');
    addTodo(todo.value);
    todo.value = '';
  });

  let addField = document.getElementById('todoText');
  addField.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
      let todo = document.getElementById('todoText');
      addTodo(todo.value);
      todo.value = '';
    }
  });
}

function fetchTodos() {
  fetch('/todo_tasks')
  .then(resp => resp.json())
  .then(data => {
    data.map(function(todo){
      updateTodos(todo);
    })
    activate();
  })
}

function addTodo(description) {

  fetch('/todo_tasks', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({todo_task: {description: description}})
  })
  .then(resp => resp.json())
  .then(data => {
    updateTodos(data);
    activate();
  })
}

function updateTodos(newTodo) {
  let todo = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span id="todo_${newTodo.id}">${newTodo.description}</span>
      <input id="check_${newTodo.id}" class="check" type="checkbox"></input>
      <a id="delete_${newTodo.id}">X</a>
    </li>`;

  let list = document.querySelector('.todoList ul.list');
  list.innerHTML = list.innerHTML += todo;
}

function activateCheckboxes(){
  let checkBoxes = document.querySelectorAll('.list li input.check');

  for(let i = 0; i < checkBoxes.length; i++){
    let box = checkBoxes[i];
    box.removeEventListener('click', {})
    box.addEventListener('change', function (e) {
      let id = this.getAttribute('id').split('_')[1];
      if (this.checked) {
        document.getElementById('todo_' + id).classList.add('done');
      }
      else {
        document.getElementById('todo_' + id).classList.remove('done');
      }
    });
  }
}

function activateDelete(){
  let deleteBtns = document.querySelectorAll('.list li a');

  for(let i = 0; i < deleteBtns.length; i++) {
    let btn = deleteBtns[i];
    let btnId = deleteBtns[i].getAttribute('id').split('_')[1];
      btn.removeEventListener('click', {})
      btn.addEventListener('click', function(e){
        fetch(`/todo_tasks/${btnId}`, {
          method: 'delete'
        })
        this.parentElement.remove();
      })

  }
}

function activate(){
  activateCheckboxes();
  activateDelete();
}