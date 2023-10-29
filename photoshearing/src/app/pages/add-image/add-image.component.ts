import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PagesServiceService } from '../pages-service.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent{
  imageForm: FormGroup;
  imagePreviews: { url: string, file: File }[] = [];
  public userId: any = sessionStorage.getItem('id');
  public albumId: any = this.data.albumId;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddImageComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private pageService:PagesServiceService,
    private router:Router
  ) {
    this.imageForm = this.formBuilder.group({
      images: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreviews.push({ url: e.target.result, file });
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  cancelImage(index: number) {
    this.imagePreviews.splice(index, 1);
  }

  uploadImages() {
    if (this.imageForm.valid) {
      const formData = new FormData();
      for (const image of this.imagePreviews) {
        formData.append('images', image.file);
      }
      formData.append('UserId',this.userId);
      formData.append('AlbumId',this.albumId);
      
      
      this.pageService.uploadImages(formData).subscribe((data:any)=>{
        this.imageForm.reset();
        this.imagePreviews = [];

        this.openSnackBar('Image Upload successfully','Close');
        this.dialogRef.close('success');
      },
      (error)=>{
        this.openSnackBar('Error in Uploading Image','Close');
      });
      
      
      
    }
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
 
}