import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService } from '@auth0/angular-jwt'
const helper = new JwtHelperService()
const loacalUrl = 'http://localhost:5000/users'
const deployedUrl = '/users'
const url = deployedUrl


@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  user_id:any;
  photoUrl:any

  constructor(private http: HttpClient) {}

  //Register User 
  registerUser(user:any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${url}/register`, user, {headers: headers});
  } 

  updateUser(user:any){
    let headers = new HttpHeaders()
    headers.append('Conten-Type','application/json')
    return this.http.post(`${url}/profile/update`,user,{headers:headers})
    
  }

  //Login User
  loginUser(user:any){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${url}/authanticate`, user, {headers: headers});
  }

  //data storage in local storage
  storeUserData(token:any,user:any){
    localStorage.setItem('id_token',token)
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('user_id',JSON.stringify(user._id))
    localStorage.setItem('photoUrl',JSON.stringify(user.photoUrl))
    this.authToken = token
    this.user = user
    this.user_id = user._id
  }

  //Logout user
  logout(){
    this.authToken = null
    this.user=null
    this.user_id = null
    localStorage.clear()
  }

  //user profie
  userProfile(){  
    this.getData()
    let header = new HttpHeaders()
    header = header.append('Authorization',this.authToken)
    header = header.append('Content-Type', 'application/json');
    return this.http.get(`${url}/profile`,{headers:header})
  }

  //fetch data from storage
  getData(){
    const userToken = localStorage.getItem('id_token')
    this.authToken = userToken
    const userDetails = localStorage.getItem('user')
  }

  getUserPhoto(){
    return JSON.stringify(localStorage.getItem('photoUrl'))
  }

  getUser(){
    return localStorage.getItem('user_id')
  }

  //logged in
  loggedIn(){
    if((localStorage.getItem('id_token') !== null))
      return true
    else{
      return false
    }
  }

  //check user email
  checkEmail(email:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type','application/json')
    return this.http.post(`${url}/forgot-password`,email,{headers:headers})
  }

  //check user details before render
  checkValidUser(id:any,token:any){
    let headers = new HttpHeaders()
    headers.append('Content-Type','application/json')
    return this.http.get(`${deployedUrl}/reset-password/${id}/${token}`,{headers:headers})
  }
  
  //reset password
  resetUserPassword(id:any,password:any){
    let headers = new HttpHeaders()
    headers.append('Content-type','application/json')
    return this.http.post(`${url}/reset-password/${id}`,password,{headers})
  }  
  createPassword(id:any,password:any){
    let headers = new HttpHeaders()
    headers.append('Content-type','application/json')
    return this.http.post(`${url}/create-password/${id}`,password,{headers})
  }
}