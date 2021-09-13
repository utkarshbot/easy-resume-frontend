import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ResumeFormService } from 'src/services/resume-form.service';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  user = Object()
  id = Object()
  constructor(private authService:AuthService,public resumeFromService:ResumeFormService) { }

  ngOnInit(): void {
    this.authService.userProfile().subscribe((data:any)=>{
      this.user = data.user
      this.id = this.user._id
      this.resumeFromService.getResume(this.id).subscribe((data:any)=>{
        if(data.success){
          this.resumeFromService.formCreated('yes')
        }
      })
    },(err)=>{
      console.log(err)
    })
  }

}
