import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthService } from 'src/services/auth.service';
import { ResumeFormService } from 'src/services/resume-form.service';

@Component({
  selector: 'app-basic-tempalte',
  templateUrl: './basic-tempalte.component.html',
  styleUrls: ['./basic-tempalte.component.css']
})
export class BasicTempalteComponent implements OnInit {
  id = Object()
  username = ""
  resumeData = Object()
  skills = []
  hobbies = []
  languages = []
  constructor(private authService:AuthService, private resumeFromService:ResumeFormService ) { }

  ngOnInit(): void {
    this.id =  this.authService.getUser()
    this.id = JSON.parse(this.id)
    this.resumeFromService.getResume(this.id).subscribe((data:any)=>{
      if(data.success){
        this.username = data.resumeData.name
        this.resumeData = data.resumeData
        this.skills = this.resumeData.skills.split(',')
        this.hobbies = this.resumeData.hobbies.split(',')
        this.languages = this.resumeData.languages.split(',')
      }
    })
  }
  download(){
    const resume:any = document.querySelector('#resume')
    html2canvas(resume,{allowTaint:true,useCORS:true})
      .then((canvas)=>{
        const img = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const imgHeight = (canvas.height * 208)/canvas.width
        pdf.addImage(img,0,0,208,imgHeight)
        pdf.save(`${this.username}-resume.pdf`)
        // const image = canvas.toDataURL('image/jpeg', 1.0);
        // const doc = new jsPDF('p', 'px', 'a4');
        // const pageWidth = doc.internal.pageSize.getWidth();
        // const pageHeight = doc.internal.pageSize.getHeight();

        // const widthRatio = pageWidth / canvas.width;
        // const heightRatio = pageHeight / canvas.height;
        // const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        // const canvasWidth = canvas.width * ratio;
        // const canvasHeight = canvas.height * ratio;

        // const marginX = (pageWidth - canvasWidth) / 2;
        // const marginY = (pageHeight - canvasHeight) / 2;

        // doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight);
        // doc.save(`${this.username}-resume.pdf`)
      })
  }

}
