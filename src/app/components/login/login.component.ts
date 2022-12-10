import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string="";
  password:string="";
  error:string="";
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(document.cookie)this.router.navigate([""])
  }

  handleLogin(){

    let user={
      username:this.username,
      password:this.password
    }
    this.authService.login(user).then(res=>{
      if(res.status > 300){
        this.error = res.msg;
        setTimeout(()=>this.error = "",2000);
      }
      else{
        document.cookie = `auth-cookie=dkekeieieir292 - ${res.userId}`
        this.router.navigate([""])
      }
    })
  }

}
