import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signupForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,private AuthService:AuthServiceService,private snackBar: MatSnackBar){
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    }, {
      validators: this.passwordMatchValidator 
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    
    
    
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  
 
  ngOnInit(): void {
    
  }

  formSubmit(){
    
    this.AuthService.signup(this.signupForm.value).subscribe((data:any)=>{
      this.signupForm.reset();
      // this.dialogRef.close('success');
      this.openSnackBar(data.message,'closed')
      this.router.navigate([''])
      
    },(error=>{
      console.log(error);
      
      this.openSnackBar(error.error.message,'closed')

    }))
    
  }

  loginpage(){
    this.router.navigate(['']);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
  
  

  
  
}
