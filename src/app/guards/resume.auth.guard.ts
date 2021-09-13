import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/services/auth.service";
import { ResumeFormService } from "src/services/resume-form.service";

@Injectable()
export class ResumeAuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router ,private resumeService:ResumeFormService){}
    
    canActivate(){
        if(this.authService.loggedIn()){
            if(this.resumeService.ifExist()){
                return true
            }
            else{
                this.router.navigate(['/form'])
                return false
            }
        }else{
            this.router.navigate(['/login'])
            return false
        }
    }
    
}
@Injectable()
export class FormAuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router ,private resumeService:ResumeFormService){}
    
    canActivate(){
        if(this.authService.loggedIn()){
           if(!this.resumeService.ifExist()){
               return true
           }else{
               this.router.navigate(['/resume'])
               return false
           }
        }else{
            this.router.navigate(['/login'])
            return false
        }
    }
    
}

@Injectable()
export class EditFormAuthGuard implements CanActivate{
    
    constructor(private authService:AuthService, private router:Router ,private resumeService:ResumeFormService){}
    
    canActivate(){
        if(this.authService.loggedIn()){
           if(this.resumeService.ifExist()){
               return true
           }else{
               this.router.navigate(['/form'])
               return false
           }
        }else{
            this.router.navigate(['/login'])
            return false
        }
    }
    
}
