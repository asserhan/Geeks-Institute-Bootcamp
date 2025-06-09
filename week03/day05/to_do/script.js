const tasks = [];
let taskId = 0;

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.querySelector(".listTasks");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const text = input.value.trim();
  if (text === "") return;

  const task = {
    task_id: taskId++,
    text: text,
    done: false
  };

  tasks.push(task);
  renderTask(task);
  input.value = "";
}

function renderTask(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "taskItem";
  taskDiv.setAttribute("data-task-id", task.task_id);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => doneTask(task.task_id, checkbox, span));

  const span = document.createElement("span");
  span.className = "taskText";
  span.textContent = task.text;

  const deleteBtn = document.createElement("i");
  deleteBtn.className = "fas fa-times deleteBtn";
  deleteBtn.addEventListener("click", () => deleteTask(task.task_id, taskDiv));

  taskDiv.appendChild(checkbox);
  taskDiv.appendChild(span);
  taskDiv.appendChild(deleteBtn);
  list.appendChild(taskDiv);
}

function doneTask(id, checkbox, textSpan) {
  const task = tasks.find(t => t.task_id === id);
  if (task) {
    task.done = checkbox.checked;
    textSpan.classList.toggle("done", task.done);
  }
}

function deleteTask(id, taskDiv) {
  const index = tasks.findIndex(t => t.task_id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    taskDiv.remove();
  }
}
const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
  tasks.length = 0; 
  list.innerHTML = ""; 
  taskId = 0; 
});

