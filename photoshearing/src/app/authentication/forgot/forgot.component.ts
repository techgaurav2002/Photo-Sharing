import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
  forgotForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder,private AuthService:AuthServiceService,private snackBar: MatSnackBar) {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgotPassword(){
    this.router.navigate(['forgot']);
  }

  forgotLink(){
    this.AuthService.forgotPassword(this.forgotForm.value).subscribe((data:any)=>{
      console.log(data);
      this.forgotForm.reset();
        this.openSnackBar(data.message, 'Close');
        this.router.navigate([''])
      
      
    },(error =>{
      console.log(error);
      
      this.openSnackBar(error.error.error, 'Close');
      this.forgotForm.reset();
    }))
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
