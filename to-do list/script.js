let addBtn = document.querySelector(".addBtn");
let closeBtn = document.querySelector("#modal-close");
let addTask = document.querySelector("#modal-add");
let modal = document.querySelector(".modal");
let taskInput = document.querySelector("#task-input");
let taskForm = document.querySelector(".task-form");
let form = document.querySelector("#form");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);
function saveToLocalStorage(obj) {
  if (localStorage.getItem("tasks") === null) {
    let currentTasks = [];
    currentTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify([obj]));
  } else {
    let oldTasks = localStorage.getItem("tasks");
    oldTasks = JSON.parse(oldTasks);
    oldTasks.push(obj);
    localStorage.setItem("tasks", JSON.stringify(oldTasks));
  }
}

displayTasks(tasks);
addBtn.addEventListener("click", () => {
  modal.classList.add("modal-show");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("modal-show");
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
    addTaskToForm();
  // your existing creation logic
});

addTask.addEventListener("click", (e) => {
  e.preventDefault();

  addTaskToForm();
});

function addTaskToForm() {
  const task = taskInput.value;
  if (task === "") {
    return showToast("❌Please Enter a Task!");
  }
  //   console.log(task);
  CreateTask(task);

  tasks.push(task);
  saveToLocalStorage(task);
  modal.classList.remove("modal-show");
  location.reload();
}

function CreateTask(elem, index) {
  let label = document.createElement("label");
  label.classList.add("form-item");

  let inp = document.createElement("input");
  inp.classList.add("content");
  inp.type = "checkbox";

  let dlt = document.createElement("button");
  dlt.type = "button";
  let icon = document.createElement("i");
  icon.className = "icon";
  icon.classList.add("ri-delete-bin-5-fill");

  dlt.append(icon);
  label.append(inp);
  dlt.addEventListener("click", (e) => {
    console.log(`delete button clicked {${elem}}`);
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
  });
  label.append(elem);
  label.appendChild(dlt);

  form.append(label);

  return form;
}

function displayTasks(task) {
  form.innerHTML = "";
  task.forEach((input, index) => {
    CreateTask(input, index);
  });
}

function showToast(message) {
  const toast = document.querySelector(".toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}
