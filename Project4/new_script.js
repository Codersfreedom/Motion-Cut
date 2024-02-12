const todoBox = document.querySelector(".todo-box");
fetchTodo();
function fetchTodo() {
    const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
    const todoDiv = document.querySelectorAll(".todo");
    if (todoDiv) {
      todoDiv.forEach((t) => {
        t.remove();
      });
  
      if (todoArray.length != 0) {
        for (let i = todoArray.length - 1; i >= 0; i--) {
          const todoElement = document.createElement("div");
          todoElement.setAttribute("class", `todo`);
          todoElement.innerHTML = `<div class="information">
                <input type="checkbox" ${
                  todoArray[i].isComplete == true && "checked"
                }  id="complete${todoArray[i].id}" />
                <label for="complete${todoArray[i].id}"></label>
                <input
                  type="text"
                  value="${todoArray[i].todo}"
                  disabled
                  id="${todoArray[i].id}"
                  
                />
              </div>
              <div class="date-container">
                <strong>${todoArray[i].date}</strong>
              </div>
              <div class="utility">
                <i id="pen" class="fa-solid fa-pen-to-square"></i>
                <i id="delete" class="fa-solid fa-trash"></i>
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
                  <input type="checkbox" ${
                    todoArray[i].isComplete == true && "checked"
                  }
                   
                   id="complete${todoArray[i].id}" />
                  <label for="complete${todoArray[i].id}"></label>
                  <input
                    type="text"
                    value="${todoArray[i].todo}"
                    disabled
                    id="${todoArray[i].id}"
                    
                  />
                </div>
                <div class="date-container">
                  <strong>${todoArray[i].date}</strong>
                </div>
                <div class="utility">
                  <i id="pen" class="fa-solid fa-pen-to-square"></i>
                  <i id="delete" class="fa-solid fa-trash"></i>
                </div>`;
          todoBox.appendChild(todoElement);
        }
      }
    }
  }
  






function AddTodo(){
    const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
    const Todo = {
      id: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100 + 1),
      todo: "Sample todo",
      date: "",
      isComplete: false,
    };
    const todo = document.querySelector("#add-value").value;
    const date = new Date().toLocaleDateString();
    if (todo != "") {
      Todo.todo = todo;
      Todo.date = date;
      todoArray.push(Todo);
      localStorage.setItem("todo", JSON.stringify(todoArray));
      document.querySelector("#add-value").value = "";
      fetchTodo()
    } else {
      alert("Enter something to add todo");
    }
}

const editBtn = document.querySelectorAll('.utility');

editBtn.forEach((b)=>{
    b.addEventListener('click',(e)=>{
            if(e.target.matches('#pen')){
                const target = e.target;
                const complete =e.target.parentElement.parentElement.firstChild.childNodes[1];
                if (!complete.checked) {
                    const inputField =
                      target.parentElement.parentElement.firstChild.childNodes[5];
                    inputField.removeAttribute("disabled");
                    inputField.focus();
                    inputField.setSelectionRange(
                      inputField.value.length,
                      inputField.value.length
                    );
                    const todoText =
                    target.parentElement.parentElement.firstChild.childNodes[5].value;
                  const todoId =
                    target.parentElement.parentElement.firstChild.childNodes[5].id;
                    console.log(todoText,todoId)
                  //updateTodo(todoText, todoId);
                }
            }
    })
})