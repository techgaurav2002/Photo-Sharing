import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagesServiceService } from '../pages-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-album-popup',
  templateUrl: './add-album-popup.component.html',
  styleUrls: ['./add-album-popup.component.css']
})
export class AddAlbumPopupComponent implements OnInit {
  public  id:any= sessionStorage.getItem('id');
  albumForm: FormGroup;


  constructor(private Route:Router,private pageService:PagesServiceService,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<AddAlbumPopupComponent>) { 
    this.albumForm = this.formBuilder.group({
      name: ['', Validators.required],
      UserId:['']
    });
  }

  ngOnInit(): void {
    this.albumForm.controls['UserId'].setValue(this.id);
  }

  addAlbum(): void {
   console.log(this.albumForm.value);
   this.pageService.addAlbum(this.albumForm.value).subscribe((data:any)=>{
    this.Route.navigate(['/admin/albums']);
   })
   
   this.dialogRef.close('success');
  }
}
