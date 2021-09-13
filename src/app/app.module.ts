import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule,HttpHeaders } from '@angular/common/http';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { LottieModule } from 'ngx-lottie';
import player from "lottie-web";


import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ValidateService } from 'src/services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginAuthGuard } from './guards/login.auth.guard';
import { BasicTempalteComponent } from './components/templates/basic-tempalte/basic-tempalte.component';
import { ElementaryTempalteComponent } from './components/templates/elementary-tempalte/elementary-tempalte.component';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { EditResumeComponent } from './components/edit-resume/edit-resume.component';
import { EditFormAuthGuard, FormAuthGuard, ResumeAuthGuard } from './guards/resume.auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ErrorComponent } from './components/error/error.component';
import { CreatePasswordComponent } from './components/create-password/create-password.component';



const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent,canActivate:[LoginAuthGuard]},
  {path:'register',component:RegisterComponent,canActivate:[LoginAuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'form',component:ResumeFormComponent, canActivate:[FormAuthGuard]},
  {path:'resume',component:BasicTempalteComponent, canActivate:[ResumeAuthGuard]},
  {path:'edit-resume',component:EditResumeComponent,canActivate:[EditFormAuthGuard]},
  {path:'create-password',component:CreatePasswordComponent,canActivate:[LoginAuthGuard]},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:`reset-password/:id/:token`,component:ResetPasswordComponent},
  {path:'error',component:ErrorComponent}
]

export function playerFactory() {
  return player
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BasicTempalteComponent,
    ElementaryTempalteComponent,
    ResumeFormComponent,
    EditResumeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CreatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    SocialLoginModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
    ValidateService,
    FlashMessagesService,
    AuthService,
    AuthGuard,
    LoginAuthGuard,
    ResumeAuthGuard,
    FormAuthGuard,
    EditFormAuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '90134197976-9cmtdaj7o02idamavu3e5r8t3kcik7ue.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1236910080150293')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
