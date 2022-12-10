import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    tasks:any[]=[]
  constructor(private taskService:TaskService, private authService:AuthService) { }

  ngOnInit(): void {
    let cookieId = parseInt(document.cookie.split(" - ")[1]);
    console.log("CookieId",cookieId);
    let user = this.authService.findUser(cookieId);
    console.log("currUser",user);
    this.taskService.getTasks(cookieId).subscribe(tasks=>{
      console.log("Tasks",tasks);

    })
  }

  handleLogout=()=>{
    console.log("Logout fired");
    this.authService.logout()
  }

}
