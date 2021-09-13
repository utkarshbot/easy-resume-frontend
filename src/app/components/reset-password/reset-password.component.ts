import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password:string = ''
  cnfPassword:string=''
  event = false
  params : Object = {id:String,token:String}
  id = ''
  token = ''

  constructor(private activatedRoute:ActivatedRoute,private authService:AuthService,private router:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    this.fetchParams()
    this.checkLink()
    // this.activatedRoute.params.subscribe((params:any)=>{
    //   if(params){
    //     this.authService.checkValidUSer(params.id,params.token).subscribe((data:any)=>{
    //       console.log('params',params)
    //       if(data.success){
             
    //       }else{
    //         this.router.navigate(['/error'])
    //       }
    //     })
    //   }
    // })
  }
  fetchParams(){
    this.activatedRoute.params.subscribe((param:any)=>{
      if(param){
        // this.params = {
        //   id:param.id,
        //   token:param.token
        // }
        this.id = param.id
        this.token = param.token
      }
    })
  }
  checkLink(){
    this.authService.checkValidUser(this.id,this.token).subscribe((data:any)=>{
      if(data.success){
        this.event = true
        console.log('hello')
      }else{
        this.router.navigate(['/error'])
      }
    })
  }
  resetPassword(){
    if(this.password === '' || this.cnfPassword === ''){
      this.flashMessage.show("Fill all the feilds !!",{cssClass:'alert-warning',timeout:3000})
      return false
    }
    if(this.password === this.cnfPassword){
      const userPasword = {password:this.password}
      this.authService.resetUserPassword(this.id,userPasword).subscribe((data:any)=>{
        if(data.success){
          this.router.navigate(['/login'])
          this.flashMessage.show("Password Changed, login again",{cssClass:'alert-success',timeout:3000})
        }else{
          this.flashMessage.show("Something Went Wrong",{cssClass:'alert-danger',timeout:3000})

        }
      })
      return true
    }else{
      this.flashMessage.show("Passwords didn't match !!",{cssClass:'alert-danger',timeout:3000})
      return false
    }
  }
}
