import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user:Object = {email:String}
  email:string =''
  disabled = false
  constructor(
    private flashMessage:FlashMessagesService, 
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
  }
  generateLink(){
    this.disabled = true
    this.user={email:this.email}
    this.authService.checkEmail(this.user).subscribe((data:any)=>{
      if(data.success){
        this.flashMessage.show('Reset Password Link send to your email, link valid for 15 minutes',{cssClass:'alert-success',timeout:5000})
        this.disabled = false

      }else{
        this.flashMessage.show('Invalid Email Address!!',{cssClass:'alert-danger',timeout:3000})
        this.disabled = false
      }
    })
  }

}
