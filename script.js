let form=document.querySelector("form");
let input=document.querySelector(".form__input");
let ToDoList=document.querySelector(".To-DoList");
let arr=getFromLocal();

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    addToArr();
})
addItem();
function addToArr(){
    let textdata=input.value.trim();
    if(textdata.length>0){
        let dataObj={
            text:textdata,
            flag:false
        }
        arr.push(dataObj);
        addItem();
        addToLocal();
        input.value="";
        console.log(arr);
    }
}
function addItem(){
    ToDoList.innerHTML='';
    arr.forEach((ele,idx)=>{
        let li=document.createElement("li");
        li.className="To-DoList__li";
        let todoText=ele.text;
        li.innerHTML=
        `
        <input type="checkbox" id="input__checkbox-${idx}" >
                <label for="input__checkbox-${idx}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="input__checkbox-${idx}" class="todo-text">
                    ${todoText}
                </label>
                <button class="del-btn">
                    <svg  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
        `
        let deletebtn=li.querySelector(".del-btn");
        deletebtn.addEventListener("click",(e)=>{
            deleteTodoItem(idx);
        })
        let check=li.querySelector("input");
        check.addEventListener("change",()=>{
            arr[idx].flag=check.checked;
            addToLocal();
        })
        check.checked = ele.flag;
        ToDoList.append(li);
    })
}
function deleteTodoItem(idx){
    arr=arr.filter((ele,i)=>i!=idx);
    addToLocal();
    addItem();
}
function addToLocal(){
    localStorage.setItem("todos",JSON.stringify(arr));
}
function getFromLocal(){
    let data=localStorage.getItem("todos")||"[]";
    return JSON.parse(data) ;
}
