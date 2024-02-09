const themeBtn = document.querySelector("#theme-toggle");
const todoBox = document.querySelector(".todo-box");
const AddBtn = document.querySelector("#add-btn");
const addValue = document.querySelector("#add-value").value;
var ToggleTheme = false;
const todoArray = JSON.parse(localStorage.getItem("todo")) || [];

// load todos from localstorage
const todos = JSON.parse(localStorage.getItem("todo")) || [];
fetchTodo();

//load user selected theme

const userTheme = localStorage.getItem("theme");

if (userTheme == "dark") {
  document.body.style.backgroundColor = "rgb(25, 39, 52)";
  document.body.style.color = "#fff";
  themeBtn.classList.replace("fa-moon", "fa-sun");
  ToggleTheme = true;
}

//theme toggle event
themeBtn.addEventListener("click", () => {
  if (!ToggleTheme) {
    document.body.style.backgroundColor = "rgb(25, 39, 52)";
    document.body.style.color = "#fff";
    themeBtn.classList.replace("fa-moon", "fa-sun");
    ToggleTheme = true;
  } else {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    themeBtn.classList.replace("fa-sun", "fa-moon");
    ToggleTheme = false;
  }

  if (themeBtn.classList.contains("fa-moon")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// fetch todo function

function fetchTodo() {
  const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
    const todoDiv = document.querySelectorAll('.todo');
  if (todoDiv) {
    todoDiv.forEach((t)=>{
            t.remove();
    })

    if (todoArray.length != 0) {
      for (let i = todoArray.length - 1; i >= 0; i--) {
      
        const todoElement = document.createElement("div");
        todoElement.setAttribute("class", `todo`);
        todoElement.innerHTML = `<div class="information">
              <input type="checkbox"  id="complete${todoArray[i].id}" />
              <label for="complete${todoArray[i].id}"></label>
              <input
                type="text"
                value="${todoArray[i].todo}"
                disabled
                
              />
            </div>
            <div class="date-container">
              <strong>${todoArray[i].date}</strong>
            </div>
            <div class="utility">
              <i class="fa-solid fa-pen-to-square"></i>
              <i class="fa-solid fa-trash"></i>
            </div>`;
        todoBox.appendChild(todoElement);
      }
    } else {
      // todo is empty
    }
  } else {
    if (todoArray.length != 0) {
      for (let i = todoArray.length - 1; i >= 0; i--) {

        const todoElement = document.createElement("div");
        todoElement.setAttribute("class", `todo`);
        todoElement.innerHTML = `<div class="information">
                <input type="checkbox" 
                 
                 id="complete${todoArray[i].id}" />
                <label for="complete${todoArray[i].id}"></label>
                <input
                  type="text"
                  value="${todoArray[i].todo}"
                  disabled
                  
                />
              </div>
              <div class="date-container">
                <strong>${todoArray[i].date}</strong>
              </div>
              <div class="utility">
                <i class="fa-solid fa-pen-to-square"></i>
                <i class="fa-solid fa-trash"></i>
              </div>`;
        todoBox.appendChild(todoElement);
      }
    }
  }
}

//function to add todo
function AddTodo() {
  const Todo = {
    id: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100 + 1),
    todo: "Sample todo",
    date: "",
    isComplete: false,
  };
  const todo = document.querySelector("#add-value").value;
  const date = new Date().toLocaleDateString();

  Todo.todo = todo;
  Todo.date = date;
  todoArray.push(Todo);
  localStorage.setItem("todo", JSON.stringify(todoArray));
  document.querySelector("#add-value").value ='';
  fetchTodo();
}
