import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currUser={};

  constructor(private router:Router) { }


  hasSession=()=>{
    console.log("checkForSession...");
    return document.cookie ? true : false;
  }

  login(user:{username:string,password:string}):Promise<any>{
    return new Promise((resolve=>{
    const users = JSON.parse(localStorage.getItem("users") || "[]") ;
    console.log("Users",users)
    let existingUserIdx = users.findIndex((u:{username:String,password:String})=>u.username == user.username)
    console.log(existingUserIdx)
    if(existingUserIdx < 0){
      console.log("no user of that name!")
      users.push({id:users.length + 1,username:user.username,password:user.password});
      localStorage.setItem("users",JSON.stringify(users));
      resolve({status:201,msg:"New user added -- session created!",userId:users.length + 1})

    }
    else if(users[existingUserIdx].password !== user.password){
      resolve({status:403,msg:"Invalid credentials!"})
    }
    else{
      resolve({status:200,msg:"Successful Login! :)",userId:users[existingUserIdx].id})
    }
   
  }))
  }


  findUser(idx:number):any{

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    return users[idx-1]

  }


  logout(){
    document.cookie = `auth-cookie=;max-age=-99999`
    this.router.navigate(["login"])
  }


 
}
