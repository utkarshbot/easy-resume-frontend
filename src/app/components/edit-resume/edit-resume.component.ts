import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthService } from 'src/services/auth.service';
import { ResumeFormService } from 'src/services/resume-form.service';
import { ValidateFormService } from 'src/services/validate-form.service';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.css']
})
export class EditResumeComponent implements OnInit {
  username = ""
  id = Object()
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
    this.id = this.authService.getUser()
    this.resumeFromService.getResume(JSON.parse(this.id)).subscribe((data:any)=>{
      if(data.success){
        data.resumeData.education.forEach((element:any,index:any) => {
          if(index == 0)
            this.removeEducation(index)
         
          this.autoAddEducation(element)
        });
        data.resumeData.certificates.forEach((element:any,index:any) => {
          if(index == 0)
          this.removeCertificate(index)
          
          this.autoAddCertificate(element)
        });
        this.username = data.resumeData.name
        this.resumeForm.setValue({
          name:data.resumeData.name,
          email:data.resumeData.email,
          phone:data.resumeData.phone,
          address:data.resumeData.address,
          objective:data.resumeData.objective,
          skills:data.resumeData.skills,
          hobbies:data.resumeData.hobbies,
          role:data.resumeData.role,
          languages:data.resumeData.languages,
          linkdin:data.resumeData.linkdin,
          github:data.resumeData.github,
          instagram:data.resumeData.instagram,
          education:data.resumeData.education,
          certificates:data.resumeData.certificates
        })
      }
    })
  }
  autoAddCertificate(elemet:any){
    const certificate = new FormGroup({
      name:new FormControl(elemet.name),
      desc:new FormControl(elemet.desc),
      date:new FormControl(elemet.date),
    })
    return (<FormArray>this.resumeForm.get('certificates')).push(certificate)
  }
  autoAddEducation(elemet:any){
    const edu = new FormGroup({
      clg:new FormControl(elemet.clg),
      stream:new FormControl(elemet.stream),
      marks:new FormControl(elemet.marks),
    })
    
    return (<FormArray>this.resumeForm.get('education')).push(edu)
  }
  updateResume(){
    if(this.validateForm.validateForm(this.resumeForm.value)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }

    if(!this.validateForm.validateEmail(this.resumeForm.value.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false
    }
    this.resumeFromService.updateResume(JSON.parse(this.id),this.resumeForm.value).subscribe((data:any)=>{
      if(data.success){
        this.flashMessage.show('Resume Updated',{cssClass:'alert-success',alert:3000})
        this.router.navigate(['/resume'])
      }else{
        this.flashMessage.show('Something Went Wrong',{cssClass:'alert-danger',alert:3000})
        this.router.navigate(['/edit-resume'])
      }
    })
    return true
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
  getEducationControl(){
    return (this.resumeForm.get('education') as FormArray).controls
  }

  getCertificateControl(){
    return(this.resumeForm.get('certificates') as FormArray).controls
  }
}
