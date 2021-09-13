import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  validateUser(user:any){
    if(
      user.firstname === "" || user.lastname === "" || user.email === "" || 
      user.password === "" || user.age === "" || 
      user.phone === "" || user.username === ""){
          return true
        }
      else
        return false
  }
  validateRegisteredUser(user:any){
    if(
      user.firstname === "" || user.lastname === "" || user.email === "" || user.phone === null || user.username === ""){
          return true
        }
      else
        return false
  }
  validateEmail(email:string){
    const verify = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    return verify.test(String(email).toLowerCase());
  }
  constructor() { }
}
