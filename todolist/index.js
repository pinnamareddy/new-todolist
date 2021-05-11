
//selectors
const todoInput = document.querySelector('.todo-input');
const saveButton= document.querySelector('.save1');
const todoButton= document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filteroption = document.querySelector('.filter-todo');

//eventlistener
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addtodo);
todoList.addEventListener('click',deletecheck);
filteroption.addEventListener('click',filterTodo);
//functions
function addtodo(event){
    //prevent form from submitting
    event.preventDefault();
    //create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
     //create li
     const newtodo = document.createElement("li");
     newtodo.innerText=todoInput.value;
     todoDiv.classList.add(`${todoInput.value}`);
     todoDiv.classList.add("todo-item");
     todoDiv.appendChild(newtodo);
     //add todo to localstorage
     saveLocalTodos(todoInput.value)
    //check mark button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check" />';
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);
     //trash mark button
 const trashbutton = document.createElement('button');
 trashbutton.innerHTML='<i class="fas fa-trash" />';
 trashbutton.classList.add("trash-btn");
 todoDiv.appendChild(trashbutton);
 //edit list
 const editbutton = document.createElement('button');
  editbutton.innerHTML='<p class="edit">edit</P>';
  editbutton.classList.add("edit-btn");
  todoDiv.appendChild(editbutton);
 //append to list
 todoList.appendChild(todoDiv)
 todoInput.value="";
}

function deletecheck(e){
    const item = e.target;
    //delete
    if(item.classList[0] === 'trash-btn'){ 
        const todo = item.parentElement; 
        todo.classList.add("fall");
        removetodo(todo);
        todo.addEventListener('transitionend',function()
        {todo.remove();
        });
         }
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement; 
         todo.classList.toggle("completed");
    }if(item.classList[0] === 'edit-btn')
    {    
        let todos;
           if(localStorage.getItem('todos')===null){
              todos=[];
            }else{
              todos = JSON.parse(localStorage.getItem('todos'));
          }
        saveButton.classList.toggle("save");
        const todo = item.parentElement;
        const todoindex = todo.childNodes[0].innerText;
        const k = todos.indexOf(todoindex);
        todoInput.value=  todoindex;
       // console.log(todos[k]);
        saveButton.addEventListener('click',help);
        function help(event){
            event.preventDefault();
            todo.children[0].innerText =todoInput.value ;
            let lem = todo.childNodes[0].innerText;
             todos[k] = lem;
             console.log(todos[k]);
            todoInput.value="";
            localStorage.setItem("todos",JSON.stringify(todos));
        }     
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all": 
            todo.style.display="flex"
            break;
             case "completed":
                 if(todo.classList.contains("completed")){
                     todo.style.display="flex"
                 }else{
                    todo.style.display="none"
                 }
                 break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex"
                }else{
                   todo.style.display="none"
                }
                break;
            }
    });
}

function saveLocalTodos(todo){
    //check--- do i already have things in there
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
//localStorage.clear();
function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
      //create div
    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo")
     //create li
     const newtodo = document.createElement("li");
     newtodo.innerText=todo;
     todoDiv.classList.add(`${todo}`);
     todoDiv.classList.add("todo-item");
     todoDiv.appendChild(newtodo);
     
    //check mark button
    const completedbutton = document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check" />';
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);
     //trash mark button
 const trashbutton = document.createElement('button');
 trashbutton.innerHTML='<i class="fa fa-trash" />';
 trashbutton.classList.add("trash-btn");
 todoDiv.appendChild(trashbutton);
  // edit button
  const editbutton = document.createElement('button');
  editbutton.innerHTML='<p class="edit">edit</P>';
  editbutton.classList.add("edit-btn");
  todoDiv.appendChild(editbutton);
 //append to list
 todoList.appendChild(todoDiv)
    });

}
 function removetodo(todo){
     let todos;
     if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
      todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoindex = todo.childNodes[0].innerText;
   todos.splice(todos.indexOf(todoindex),1);
   localStorage.setItem("todos",JSON.stringify(todos));
}