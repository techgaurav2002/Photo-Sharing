import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { PagesServiceService } from '../pages-service.service';

@Component({
  selector: 'app-sheard-popup',
  templateUrl: './sheard-popup.component.html',
  styleUrls: ['./sheard-popup.component.css']
})
export class SheardPopupComponent implements OnInit {
  albumid: number = this.data.albumId;
  sharedForm: FormGroup;
  public userId: any = sessionStorage.getItem('id');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SheardPopupComponent>,
    private formBuilder: FormBuilder,
    private pageService: PagesServiceService,
    private snackBar: MatSnackBar 
  ) {
    this.sharedForm = this.formBuilder.group({
      emailList: [''],
      AlbumId: [this.albumid],
      UserId: [this.userId]
    });
  }

  ngOnInit(): void {
    console.log(this.albumid);
  }

  sharedAlbum() {
    this.pageService.sharingAlbum(this.sharedForm.value).subscribe((data: any) => {
      
      this.openSnackBar('Album shared successfully', 'Close'); 
    });
    this.dialogRef.close();
  }

  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}