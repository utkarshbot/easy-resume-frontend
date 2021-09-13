import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  password : String = ''
  cnfPassword : String = ''
  id = ''

  constructor(private activatedRoute:ActivatedRoute,private authService:AuthService,private router:Router,private flashMessage:FlashMessagesService) { }

  ngOnInit(): void {
    this.authService.userProfile().subscribe((data:any)=>{
      this.id = data.user._id
    },(err)=>{
      console.log(err)
    })
  }
  createPassword(){
    if(this.cnfPassword === '' || this.password === ''){
      this.flashMessage.show("Fill all the feilds !!",{cssClass:'alert-warning',timeout:3000})
      return false
    }
    if(this.password === this.cnfPassword){
      const password = {password:this.password}
      this.authService.createPassword(this.id,password).subscribe((data:any)=>{
        if(data.success){
          this.router.navigate(['/dashboard'])
        }else{
          this.flashMessage.show("Try Again",{cssClass:'alert-warning',timeout:3000})
        }
      })
    }
    return true
  }
}
