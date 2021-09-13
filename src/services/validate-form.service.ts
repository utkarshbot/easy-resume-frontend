import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateFormService {

  constructor() { }

  validateForm(form:any){
      if(
      form.name === ''|| form.email === ''|| form.phone === ''|| form.address === ''|| 
      form.role === ''|| form.skills === ''|| form.linkdin === ''|| form.github === ''|| form.instagram === ''|| form.objective === ''|| 
      form.hobbies === ''
      ){
        return true
      }
      else{
        return false
      }
  }
  validateEmail(email:string){
    const verify = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return verify.test(String(email).toLowerCase());
  }
}
