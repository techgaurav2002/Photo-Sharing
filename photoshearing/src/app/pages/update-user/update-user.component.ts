import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagesServiceService } from '../pages-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  public  id:any= sessionStorage.getItem('id');
  updateForm: FormGroup;
  user:any = [];
  constructor(private route: ActivatedRoute,private pageService:PagesServiceService,private Route:Router,private formBuilder: FormBuilder) {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      filename: ['']
    });
   }

  ngOnInit(): void {
    this.getOneUser(this.id);
  }

  token = sessionStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`,
    })
  };

  getOneUser(id:number){
    this.pageService.getOneUser(id,this.httpOptions).subscribe((data:any)=>{
      // console.log(data);
      
      this.user = data.data;

      this.updateForm.controls['firstName'].setValue(this.user.firstName);
        this.updateForm.controls['lastName'].setValue(this.user.lastName);
        this.updateForm.controls['phone'].setValue(this.user.phone);
        this.updateForm.controls['address'].setValue(this.user.address);
        this.updateForm.controls['filename'].setValue(this.user.filename);
    })
  }


  userUpdate(event :any){
    const formData = new FormData(event.target);
    this.pageService.updateUser(this.id,formData).subscribe((data:any)=>{
      this.Route.navigate(['/admin']);
      
    })
    console.log(this.updateForm.value);
    
  }


}
