const tasksDiv = document.getElementById("tasks");
const addButton = document.querySelector(".btn-add");
const deleteButton = document.querySelector(".btn-delete");
const editButton = document.querySelector(".btn-edit");
const completeButton = document.querySelector(".btn-complete");

let tasksList = [];

let storedTasks = JSON.parse(localStorage.getItem("tasks"));

if (storedTasks) {
  tasksList = storedTasks;
} else {
  tasksList = [
    {
      tittle: "قراءة ورد القران",
      date: "2024/3/20 | 5:47",
      isDone: false,
    },
    {
      tittle: "Writing training",
      date: "2024/3/20 | 6:28",
      isDone: true,
    },
    {
      tittle: "Study 10 lessons",
      date: "2024/3/20 | 8:00",
      isDone: false,
    },
  ];
}

function addTasksToPage() {
  tasksDiv.innerHTML = "";
  let content;
  let index = 0;
  for (let task of tasksList) {
    content = `
        <div class="card task ${task.isDone ? "done" : ""} border-0">
            <div class="card-header task__header">
                <div>
                    <h5 class="task__tittle">${task.tittle}</h5>
                    <footer class="blockquote-footer task__date mt-1 mb-0">${
                      task.date
                    }</footer>
                </div>
                <div class="task__buttons">
                    <button onclick="completeTask(${index})" class="circular btn-complete">
                        <span class="material-symbols-outlined">
                            ${task.isDone ? "cancel" : "done"}
                        </span>
                    </button>
                    <button onclick="updateTask(${index})" class="circular btn-edit">
                        <span class="material-symbols-outlined">
                            edit
                        </span>
                    </button>
                    <button onclick="deleteTask(${index})" class="circular btn-delete">
                        <span class="material-symbols-outlined">
                            delete
                        </span>
                    </button>
                </div>
            </div>
        </div>`;

    tasksDiv.innerHTML += content;
    index++;
  }
}

function addTask() {
  let taskName = prompt("أدخل مهمه جديدة: ");
  if (taskName) {
    let now = new Date();
    let time = now.getHours() + ":" + now.getMinutes();
    let date =
      now.getFullYear() +
      "/" +
      (now.getMonth() + 1) +
      "/" +
      now.getDate() +
      " | " +
      time;
    let theNewTask = {
      tittle: taskName,
      date: date,
      isDone: false,
    };
    tasksList.push(theNewTask);
    storeTasks();
    addTasksToPage();
  }
}

function deleteTask(index) {
  let theTask = tasksList[index].tittle;
  let isConfirm = confirm("هل تريد حذف مهمة: " + theTask);
  if (isConfirm) {
    tasksList.splice(index, 1);
    storeTasks();
    addTasksToPage();
  }
}

function updateTask(index) {
  let newText = prompt("أدخل عنوان المهمة الجديد: ", tasksList[index].tittle);
  if (newText) {
    tasksList[index].tittle = newText;
    storeTasks();
    addTasksToPage();
  }
}

function completeTask(index) {
  tasksList[index].isDone = !tasksList[index].isDone;
  storeTasks();
  addTasksToPage();
}

function storeTasks() {
  let strTasksList = JSON.stringify(tasksList);
  localStorage.setItem("tasks", strTasksList);
}

addTasksToPage();
