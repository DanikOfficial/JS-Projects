// Todo Items Array
let todoItens = [];

document.querySelector(".create-todo").addEventListener("keyup", (event) => {
  let input = document.querySelector(".create-todo");

  const taskName = input.value.trim();

  if (event.key === "Enter") {
    if (taskName === "") {
      alert("Error: Can't add an empty task.");
    } else {
      addTodo(taskName);
      input.value = "";
    }
  }
});

document.querySelector(".todo-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    // Get the ID of the Task element
    let id = event.target.parentElement.dataset.key;

    // Get the ID of the taskname
    let taskNameId = event.target.dataset.key;

    markTaskAsCompleted(id, taskNameId);
  }

  if (event.target.classList.contains("js-delete-todo")) {
    let id = event.target.parentElement.dataset.key;

    deleteTask(id);
  }
});

function addTodo(taskName) {
  /**
   * id: The id used to delete the task
   * taskNameId: The id used to mark the task as completed
   */
  const todo = {
    taskName,
    completed: false,
    id: Math.floor(Math.random() * 1000 * 100),
    taskNameId: Math.floor(Math.random() * 1000 + 1000),
  };

  todoItens.push(todo);
  renderTodo(todo);
}

function deleteTask(id) {
  // Gets the task
  let item = document.querySelector(`[data-key='${id}']`);

  // Creates a new array without the deleted task
  todoItens = todoItens.filter((task) => task.id !== Number(id));

  // Updates the UI deleting the task
  item.remove();
}

function markTaskAsCompleted(id, taskNameId) {
  // Gets the task that will be marked as completed
  let item = document.querySelector(`[data-key='${taskNameId}']`);

  // Get the index of the task
  let index = todoItens.findIndex((task) => task.id === Number(id));

  // Update the completed property of the task
  todoItens[index].completed = !todoItens[index].completed;

  // Marks the task as completed in the UI
  item.classList.toggle("completed");
}

function renderTodo(todo) {
  let list = document.querySelector(".todo-list");

  list.insertAdjacentHTML(
    "afterbegin",
    `<li class="task" data-key="${todo.id}">
  <span data-key="${todo.taskNameId}" class="js-tick task-name">${todo.taskName}</span
  ><button class="delete-todo js-delete-todo">X</button>
</li>`
  );
}
