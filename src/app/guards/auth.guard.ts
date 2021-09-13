import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router){}

   canActivate(){
       if(this.authService.loggedIn()){
           return true
       }else{
           this.router.navigate(['/login'])
           return false
       }
   }
   
}