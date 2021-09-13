import { Injectable } from "@angular/core";
import {CanActivate, Router } from "@angular/router";

import { AuthService } from "src/services/auth.service";

@Injectable()
export class LoginAuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router){}

   canActivate(){
       if(this.authService.loggedIn()){
           this.router.navigate(['/profile'])
           return false
       }else{
           return true
       }
   }
   
}