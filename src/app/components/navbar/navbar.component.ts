import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[AuthService]
})
export class NavbarComponent implements OnInit {
  profileUrl = Object()
  constructor(
    private flashMessage:FlashMessagesService, 
    public authService:AuthService,
    
    private router:Router) { }


  ngOnInit(): void {
    // this.profileUrl = this.authService.getUserPhoto()
    // console.log(this.profileUrl)
  }
  logoutUser(){
    this.authService.logout()
    this.flashMessage.show('You are logged out', {cssClass: 'alert-primary', timeout: 3000});
      this.router.navigate(['/login']);
  }

  

}
