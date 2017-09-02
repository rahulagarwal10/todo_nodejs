    const RESPONSE_DONE=4;
const STATUS_OK=200;
console.log("hi");
//window.onload=getTodosAJAX();
window.onload=addActiveAJAX();
window.onload=addCompleteAJAX();
window.onload=addDeleteAJAX();

    function addActiveElements(todos_data_json) {
        var parent=document.getElementById("active_list");
        parent.innerHTML="";
        // parent.innerText=todos_data_json;
        var todos=JSON.parse(todos_data_json);
        if(parent){
            Object.keys(todos).forEach(
                function(key){
                    var todo_element=createTodoElement(key,todos[key]);
                    parent.appendChild(todo_element);}
            )
        }
    }
    function addCompleteElements(todos_data_json) {
        var parent=document.getElementById("complete_list");
        parent.innerHTML="";
        // parent.innerText=todos_data_json;
        var todos=JSON.parse(todos_data_json);
        if(parent){
            Object.keys(todos).forEach(
                function(key){
                    var todo_element=createTodoElement(key,todos[key]);
                    parent.appendChild(todo_element);}
            )
        }
    }
    function addDeletedElements(todos_data_json) {
        var parent=document.getElementById("deleted_list");
        parent.innerHTML="";
        // parent.innerText=todos_data_json;
        var todos=JSON.parse(todos_data_json);
        if(parent){
            Object.keys(todos).forEach(
                function(key){
                    var todo_element=createTodoElement(key,todos[key]);
                    parent.appendChild(todo_element);}
            )
        }
    }
function createTodoElement(id,todo_object){
    var todo_element=document.createElement("div");
    todo_element.innerHTML="<label  for="+id+">"+todo_object.title+"</label>";
    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","todoStatus"+todo_object.status);

   if(todo_object.status=="ACTIVE")
    {
        var complete_button;
        complete_button=document.createElement("input");
        complete_button.type="checkbox";
        complete_button.setAttribute("id",id);
        complete_button.setAttribute("class","head1");
        complete_button.checked=false;
        complete_button.setAttribute("onclick","completeTodoAJAX("+id+")");
        todo_element.insertBefore(complete_button,todo_element.firstChild);

        complete_button=document.createElement("img");
        complete_button.setAttribute("src","cross1.jpg");
        complete_button.setAttribute("class","cross_image head1");
        complete_button.setAttribute("onclick","deleteTodoAJAX("+id+")");
        todo_element.insertBefore(complete_button,todo_element.firstChild);
    }


    if(todo_object.status=="COMPLETE")
    {
        complete_button=document.createElement("input");
        complete_button.type="checkbox";
        complete_button.checked="true";
        complete_button.setAttribute("id",id);
        complete_button.setAttribute("class","head1");
        complete_button.setAttribute("onclick","activeTodoAJAX("+id+")");
        todo_element.insertBefore(complete_button,todo_element.firstChild);

        complete_button=document.createElement("img");
        complete_button.setAttribute("src","cross1.jpg");
        complete_button.setAttribute("class","cross_image head1");
        complete_button.setAttribute("onclick","deleteTodoAJAX("+id+")");
        todo_element.insertBefore(complete_button,todo_element.firstChild);
    }
    return todo_element;
}

function  addTodoAJAX() {
    var title1=document.getElementById("new_todo_input");
    var title=title1.value;
    title1.value="";
    var xhr=new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data="todo_title=" + encodeURI(title);
    xhr.onreadystatechange=function () {
     if(xhr.readyState==RESPONSE_DONE){
         if(xhr.status==STATUS_OK) {
             addActiveElements(xhr.responseText);
             addActiveAJAX();
         }
     }
     else
     {
         console.log(xhr.responseText);
     }
    }
xhr.send(data);
}

function completeTodoAJAX(id) {
    console.log(id);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    var data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function () {

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addActiveElements(xhr.responseText);
                addActiveAJAX();
                addCompleteElements(xhr.responseText);
                addCompleteAJAX();

            }
            else {
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

    function activeTodoAJAX(id) {
        console.log(id);
        var xhr = new XMLHttpRequest();
        xhr.open("PUT","/api/todos/"+id, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        var data = "todo_status=ACTIVE";

        xhr.onreadystatechange = function () {

            if (xhr.readyState == RESPONSE_DONE) {
                if (xhr.status == STATUS_OK) {
                    addActiveElements(xhr.responseText);
                    addActiveAJAX();
                    addCompleteElements(xhr.responseText);
                    addCompleteAJAX();

                }
                else {
                    console.log(xhr.responseText);
                }
            }

        }
        xhr.send(data);

    }

    function  deleteTodoAJAX(id) {
        var xhr=new XMLHttpRequest();
        xhr.open("DELETE","/api/todos/"+id,true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        data="todo_status=DELETED";
        xhr.onreadystatechange=function () {
            if(xhr.readyState==RESPONSE_DONE){
                if(xhr.status==STATUS_OK) {
                    addDeletedElements(xhr.responseText);
                    addDeleteAJAX();
                    addActiveElements(xhr.responseText);
                    addActiveAJAX();
                    addCompleteElements(xhr.responseText);
                    addCompleteAJAX();
                }
            }
            else
            {
                console.log(xhr.responseText);
            }
        };
        xhr.send(data);

    }

    function  addActiveAJAX() {
        //var title=document.getElementById("new_todo_input").value;
        var xhr=new XMLHttpRequest();
        xhr.open("GET","/api/todos/active",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //var data="todo_title=" + encodeURI(title);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==RESPONSE_DONE){
                if(xhr.status==STATUS_OK)
                    addActiveElements(xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
        xhr.send(data=null);
    }

    function  addCompleteAJAX() {
        var title=document.getElementById("new_todo_input").value;
        var xhr=new XMLHttpRequest();
        xhr.open("GET","/api/todos/complete",true);
        //xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //var data="todo_title=" + encodeURI(title);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==RESPONSE_DONE){
                if(xhr.status==STATUS_OK)
                    addCompleteElements(xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        }
        xhr.send(data=null);
    }

    function  addDeleteAJAX() {
        var title=document.getElementById("new_todo_input").value;
        var xhr=new XMLHttpRequest();
        xhr.open("GET","/api/todos/deleted",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        //var data="todo_title=" + encodeURI(title);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==RESPONSE_DONE){
                if(xhr.status==STATUS_OK)
                    addDeletedElements(xhr.responseText);
            }
            else
            {
                console.log(xhr.responseText);
            }
        };
        xhr.send(data=null);
    }

    function hideCompleted() {
        var x = document.getElementById('complete_list');
        var y=document.getElementById('hide_completed');

        if (x.style.display === 'none') {
            x.style.display = 'block';
            y.value="Hide Completed Items";

        } else {
            x.style.display = 'none';
            y.value="Unhide Completed Items";

        }
    }

    function hideDeleted() {
        var x = document.getElementById('deleted_list');
        var y=document.getElementById('hide_deleted')
        if (x.style.display === 'none') {
            x.style.display = 'block';
            y.value="Hide Deleted Items";
        } else {
            x.style.display = 'none';
            y.value="Unhide Deleted Items ";
        }
    }

    function handle(e){
        if(e.keyCode === 13){
            addTodoAJAX(); }}

    $("#hide_deleted").click(function(){
        $("#deleted_list").fadeToggle("slow");
            });




