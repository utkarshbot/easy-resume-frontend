import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService } from '@auth0/angular-jwt'
const loacalUrl = 'http://localhost:5000/users'
const deployedUrl = '/users'
const url = deployedUrl

@Injectable({
  providedIn: 'root'
})
export class ResumeFormService {

  constructor(private http:HttpClient) { }

  generateResume(resumeData:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type','application/json')
    return this.http.post(`${url}/generateResume`,resumeData,{headers:headers})
  }
  getResume(id:any){
    let headers = new HttpHeaders()  
    headers.append('Content-type','application/json')
    return this.http.get(`${url}/getresume${id}`,{headers:headers})
  }
  updateResume(id:any,resumeData:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type','application/json')
    return this.http.post(`${url}/update-resume${id}`,resumeData,{headers:headers})
  }
  

  formCreated(exist:string){
    localStorage.setItem('resume',exist)
  }
  ifExist(){
    if(localStorage.getItem('resume')){
      return true
    }else{
      return false
    }
  }
}
