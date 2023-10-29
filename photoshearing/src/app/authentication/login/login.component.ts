import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var annyang: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  isUserSpeaking: boolean = false;
  searchText: string = '';

  ngOnInit() {
    
  }
  loginForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,private AuthService:AuthServiceService,public dialog: MatDialog,private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  loginUser(){
    this.AuthService.login(this.loginForm.value).subscribe(
      (data: any) => {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('email', data.payload.email);
        sessionStorage.setItem('id', data.payload.userId);
        sessionStorage.setItem('filename', data.payload.filename);
        console.log(data);
        
        this.openSnackBar(data.message,'Close')
        this.router.navigate(['/admin']);
        
      },
      (error: any) => {
        console.log("gaurav");
        this.loginForm.reset();
        this.openSnackBar(error.error.message,'Close')
        
      }
    );
  }
  forgotPassword(){
    this.router.navigate(['forgot']);
  }

  // opensignupPage(){
  //   // const dialogRef = this.dialog.open(SignupComponent, {
  //   //   width: '75%',
  //   //   height:'700px'

  //   // });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if (result === 'success') {
  //   //     this.loginForm.reset() ;
  //   //   }

  //   // });
  //   this.router.navigate(['signUp']);
  // }

  signupPage(){
    this.router.navigate(['signUp']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
