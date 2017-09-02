var StatusENUMS={
    ACTIVE:"ACTIVE",
    COMPLETE:"COMPLETE",
    DELETED:"DELETED"
};

var todos={
    1:{title:"Learn Java",status:StatusENUMS.COMPLETE},
    2:{title:"Git Tutorial",status:StatusENUMS.ACTIVE},
    3:{title:"Interactive Git",status:StatusENUMS.ACTIVE}
};
var next_todo_id=4;
var status_array=[];
var j=0;
for(var i in StatusENUMS){
    status_array[j]=i;
    j++;
}
module.exports={
    StatusENUMS:StatusENUMS,
    todos:todos,
    next_todo_id:next_todo_id,
    status_array:status_array
};



