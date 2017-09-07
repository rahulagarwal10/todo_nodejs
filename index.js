var todo_db= require("./seed.js");
var express=require("express");
var bodyparser=require("body-parser");


console.log(todo_db);
var app=express();

app.use("/",express.static(__dirname+"/public"));

app.use("/",bodyparser.urlencoded({extended:false}));

app.get("/api/todos",function(req,res){
    res.json(todo_db.todos);
    console.log(req.headers.host);
    //res.json({a:"rahul"});

});

app.delete("/api/todos/:id",function(req,res){
    var del_id=req.params.id;
    var todo=todo_db.todos[del_id];
    if(!todo){
        res.status(400).json({error:"todo doesn't exist"});
    }
    else
    {
       todo.status=todo_db.StatusENUMS.DELETED;
       res.json(todo_db.todos);
    }

});

app.post("/api/todos",function(req,res){
    var todo=req.body.todo_title;

    if(!todo || todo=="" || todo.trim()==""){
        res.status(400).json({error:"todo cant be empty"});
    }
    else
    {
        var new_todo_object={
            title:req.body.todo_title,
            status:todo_db.StatusENUMS.ACTIVE
        }
        todo_db.todos[todo_db.next_todo_id++]=new_todo_object;
        res.json(todo_db.todos);
    }

});

app.put("/api/todos/:id",function (req,res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];
    if(!todo)
    {
        res.status(400).json({error:"cant modify todo that doesnt exist"});
    }
    else
    {
        //var todo_title=req.body.todo_title;
        //if(todo_title && todo_title!="" && todo_title.trim()!="")
        //{
         //   todo.title=todo_title;
        //}
          var todo_status=req.body.todo_status;
        if(todo_status && (todo_status==todo_db.StatusENUMS.ACTIVE || todo_status==todo_db.StatusENUMS.COMPLETE))
        {
            todo.status=todo_status;
        }

        res.json(todo_db.todos);

    }


});

 app.get("/api/todos/:state",function(req,res){
    var todo={},i=1,k=false,state=req.params.state;
    for(var j in todo_db.status_array) {

        if (state.toString().toUpperCase() == todo_db.status_array[j]) {
            k = true;
            break;
        }
    }
    if(!k)
        res.status(400).json({error:"bad request"});
    else {
        while (i < todo_db.next_todo_id) {
            if (todo_db.todos[i].status === state.toString().toUpperCase())
                todo[i] = todo_db.todos[i];
            i++;
        }
        res.json(todo);
    }
});

app.put("/api/todos/:state/:id",function (req,res) {
    var state=req.params.state,k=false;
    if(req.params.state.toString().toUpperCase()==="DELETE" || req.params.state.toString().toUpperCase()==="DELETED")
        res.status(400).json({error:"bad request"});
    for(var j in todo_db.status_array) {
        if (state.toString().toUpperCase() == todo_db.status_array[j]) {
            k = true;
            break;
        }
    }
    if(!k)
        res.status(400).json({error:"bad request"});
    else {
        todo_db.todos[req.params.id].status = req.params.state.toString().toUpperCase();
        res.json(todo_db.todos);
    }
});

app.listen(5000);