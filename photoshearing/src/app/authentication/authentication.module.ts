import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const authRoutes = [
  { path: '', component: LoginComponent },
  {path: 'signUp',component: SignupComponent},
  {path:'forgot',component:ForgotComponent},
  {path:'resetPassword',component:ResetPasswordComponent}
  // ... other authentication routes
];




@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    FormsModule
    
  ],exports:[
    LoginComponent,
    SignupComponent,
    RouterModule
  ]
})
export class AuthenticationModule { }
