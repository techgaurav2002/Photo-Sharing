import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  token:any = ''
  resetForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,private AuthService:AuthServiceService,private route: ActivatedRoute,private snackBar: MatSnackBar) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },{
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('newPassword');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    
    
    
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  ngOnInit(): void {
      this.route.queryParams.subscribe(params=>{
        this.token = params['token'] || this.token
      })
      
  }

  resetPassword(){
    this.AuthService.resetPassword(this.token,this.resetForm.value).subscribe((data:any)=>{
      this.openSnackBar(data.message, 'Close');
      this.resetForm.reset();
        this.router.navigate([''])
      
    },(error:any)=>{
      this.openSnackBar('Something went wrong', 'Close');
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
