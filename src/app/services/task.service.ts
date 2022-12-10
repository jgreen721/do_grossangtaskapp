import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


type TaskType={
  id:number,
  task:string,
  is_complete:boolean,
  score:number,
  userId:number
}


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:TaskType[]=[];
  constructor() { }

  getTasks(id:number){

    let tasks =JSON.parse(localStorage.getItem("tasks") || "[]");
    if(!tasks.length){
    return of({
      status:404,
      msg:"Empty Task Bin! :("
    })
  }
    console.log("Tasks",tasks, "UsersId",id);
  let usersTasks = tasks.filter((t:any)=>t.userId == id);
     return of({
       status:300,
       msg:"Check for tasks",
       usersTasks
     })
  }

  addTask(task:any){
    console.log("newTask",task);
    this.tasks.push({id:this.tasks.length+1,...task});
    console.log("new Task added");
    localStorage.setItem("tasks",JSON.stringify(this.tasks));

  }
}
