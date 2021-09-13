import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService,FacebookLoginProvider } from 'angularx-social-login';
import { AnimationOptions } from 'ngx-lottie';

import * as $ from 'jquery'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstname:string=""
  lastname:string=""
  email:string=""
  phone:string = ""
  age:string = ""
  username:string=""
  password:string=""
  alert = false
  message = ''
  social = false
  options : AnimationOptions = {
    path:'https://assets5.lottiefiles.com/packages/lf20_uya4kd2o.json'
  }
  
  userVerification : {success:boolean,msg:string} = Object()

  constructor(
    private validateService:ValidateService, 
    private flashMessage:FlashMessagesService, 
    private authService:AuthService,
    private router:Router,
    private socialAuth: SocialAuthService
    ) { }

  ngOnInit(): void {
  }

  registerUser(){
    const user = {
      firstname:this.firstname,
      lastname:this.lastname,
      email:this.email,
      password:this.password,
      age:this.age,
      username:this.username,
      phone:this.phone
    }
    
    if(this.validateService.validateUser(user)) {
      //this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      this.alert = true
        this.closeAlert()
        this.message = 'Please fill in all fields'
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)) {
    //this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
    this.alert = true
        this.closeAlert()
        this.message = 'Please use a valid email'
      return false;
    }

    // Register user
    this.register(user)
  return true

  }
  googleSignUp(){
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID).then((data:any)=>{
        console.log(data)
        const user = {
          firstname:data.firstName,
          lastname:data.lastName,
          email:data.email,
          socialPassword:data.id,
          username:data.firstName,
          photoUrl:data.photoUrl,
          social : true
        }
      
        this.register(user)
    }).catch((err)=>console.log(err))
  }
  fbSignUp(){
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then((data:any)=>{
      const user = {
        firstname:data.firstName,
        lastname:data.lastName,
        email:data.email,
        socialPassword:data.id,
        username:data.firstName,
        photoUrl:data.photoUrl,
        social:true
      }
      
      this.register(user)
    }).catch((err)=>console.log(err))
  }

  register(user:any){
    this.authService.registerUser(user).subscribe((data:any) => {
      if(data.success) {
        this.authService.storeUserData(data.token,data.user)
        //this.flashMessage.show('You are Registered !!', {cssClass: 'alert-success', timeout: 3000});
        if(data.user.social){
          this.router.navigate(['/create-password']);
        }else{
          this.router.navigate(['/dashboard']);
        }
      } else {
        this.alert = true
        this.closeAlert()
        this.message = 'Something went wrong'
        //this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

  closeAlert(){
    window.setTimeout(function() {
      $(".alert").prop('visibility','hidden');
  }, 2000);
  setTimeout(()=>{
    this.alert = false
    this.message = ''
  },3000)
  }
}