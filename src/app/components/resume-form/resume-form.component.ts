import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';
import { ResumeFormService } from 'src/services/resume-form.service';
import { ValidateFormService } from 'src/services/validate-form.service';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css']
})
export class ResumeFormComponent implements OnInit {
  resumeData  = Object()
  id = Object()
  Education:any
 
  resumeForm = new FormGroup({
    name: new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    address:new FormControl(''),
    objective:new FormControl(''),
    skills:new FormControl(''),
    hobbies:new FormControl(''),
    role:new FormControl(''),
    languages:new FormControl(''),
    linkdin:new FormControl(''),
    github:new FormControl(''),
    instagram:new FormControl(''),
    education: new FormArray([new FormGroup({
      clg:new FormControl(''),
      stream:new FormControl(''),
      marks:new FormControl('')
    })]),
    certificates: new FormArray([new FormGroup({
      name:new FormControl(''),
      desc:new FormControl(''),
      date:new FormControl(''),
    })])
  })

  constructor(
    private resumeFromService:ResumeFormService, 
    private flashMessage:FlashMessagesService,
    private router:Router,
    private authService:AuthService,
    private validateForm:ValidateFormService
    ) { }

  ngOnInit(): void {
    
  }
  getEducationControl(){
    return (this.resumeForm.get('education') as FormArray).controls
  }

  getCertificateControl(){
    return(this.resumeForm.get('certificates') as FormArray).controls
  }

  addEducation() {
    const ed = new FormGroup({
      clg:new FormControl(''),
      stream: new FormControl(''),
      marks: new FormControl('')
    });
    (<FormArray>this.resumeForm.get("education")).push(ed)
  }

  addCertificate(){
    const certificate = new FormGroup({
      name:new FormControl(''),
      desc:new FormControl(''),
      date:new FormControl(''),
    })
    return (<FormArray>this.resumeForm.get('certificates')).push(certificate)
  }

  removeEducation(i:any){
    (<FormArray>this.resumeForm.get("education")).removeAt(i)
  }

  removeCertificate(i:any){
    (<FormArray>this.resumeForm.get("certificates")).removeAt(i)
  }

  createResume(){

    if(this.validateForm.validateForm(this.resumeForm.value)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    if(!this.validateForm.validateEmail(this.resumeForm.value.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    this.id =  this.authService.getUser()
    console.log(this.id)
    this.id = JSON.parse(this.id)
    this.resumeData = {id:this.id,resumeForm:this.resumeForm.value}
    this.resumeFromService.generateResume(this.resumeData).subscribe((data:any)=>{
      if(data.success){
        this.flashMessage.show('resume created', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard'])
        
      } else{
        this.flashMessage.show('Error', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/form'])
      }
    })
    return true
  }
}
