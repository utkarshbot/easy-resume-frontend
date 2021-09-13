import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { GoogleLoginProvider, SocialAuthService,FacebookLoginProvider } from 'angularx-social-login';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/services/auth.service';

import * as $ from 'jquery'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnChanges {
  email:string=""
  password:string=""
  alert = false
  message = ''
  options : AnimationOptions = {
    path:'https://assets9.lottiefiles.com/packages/lf20_dyq0qz89/data.json'
  }

  constructor( private flashMessage:FlashMessagesService, 
    private authService:AuthService,
    private socialAuth: SocialAuthService,
    private router:Router) { }

  ngOnInit(): void {
      
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('hello')
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes)
  }
  loginUser(){
    if(this.email === '' || this.password === ''){
      this.alert = true
      this.message = 'Fill the required feilds'
      this.closeAlert()
      return false
    }else{
      const user = {
        username:this.email,
        password:this.password
      }
      this.login(user)
      return true
    } 
  }
  googleLogin(){
    this.socialAuth.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((data:any)=>{
      console.log(data)
      const user = {
        password:data.id,
        email:data.email,
      }
      this.login(user)
  }).catch((err)=>console.log(err))
  }
  fbLogin(){
    this.socialAuth.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((data:any)=>{
      console.log(data)
      const user = {
        password:data.id,
        email:data.email,
      }
      
      this.login(user)
  }).catch((err)=>console.log(err))
  }
  login(user:any){
    this.authService.loginUser(user).subscribe((data:any)=>{
      if(data.success){
          this.authService.storeUserData(data.token,data.user)
          //this.flashMessage.show('You are logged in', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/dashboard'])
      }else{
        //this.flashMessage.show(data.message, {cssClass: 'alert-danger', timeout: 3000});
        this.alert = true
        this.message = 'Login failed! Wrong Username or Password'
        this.closeAlert()
        this.router.navigate(['/login'])
      }
    })
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
