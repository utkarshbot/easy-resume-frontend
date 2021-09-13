import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';
import { ValidateService } from 'src/services/validate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = Object()
  constructor(
    private validateService:ValidateService,
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.authService.userProfile().subscribe((data:any)=>{
      this.user = data.user
    },(err)=>{
      console.log(err)
    })
  }
  updateUser(){
      const updatedUser = {
        _id:this.user._id,
        firstname:this.user.firstname,
        lastname:this.user.lastname,
        email:this.user.email,
        username:this.user.username,
        
      }
      
      if(this.validateService.validateRegisteredUser(updatedUser)) {
        this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }
  
      // Validate Email
      if(!this.validateService.validateEmail(updatedUser.email)) {
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
        return false;
      }

      this.authService.updateUser(updatedUser).subscribe((data:any) => {
       
        if(data.success) {
          this.flashMessage.show('Profile Updated', {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/profile']);
          this.user = data.user
          this.authService.storeUserData(data.token,data.user)
        } else {
          this.flashMessage.show('Change Username', {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/profile']);
        }
      });
      return true
  }
}
