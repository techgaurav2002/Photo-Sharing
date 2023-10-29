import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagesServiceService } from '../pages-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit{
  settings:any = [];
  albumid:number = this.data.albumId;
  isPublicVal:any = true;
  approvalVal:any = true;
  settingForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SettingComponent>,
    private pageService:PagesServiceService,
    private formBuilder: FormBuilder

  ) {
    this.settingForm = this.formBuilder.group({
      approval: [''],
      ispublic: [''],
    });
  };
 
  

  ngOnInit(): void {
   this.getAlbumSetting(this.albumid);
      
      
  }

  getAlbumSetting(id:number){
    this.pageService.getSetting(id).subscribe((data:any)=>{
      this.settings = data.data
      if(this.settings.approval == 1){
        this.settingForm.controls['approval'].setValue(true);
      }
      if(this.settings.ispublic == 1){
        this.settingForm.controls['ispublic'].setValue(true);
      }
      console.log(this.settings);
      
    })
  }

  updateSetting(id:number){
    // console.log(this.settingForm.value);
    this.isPublicVal = this.settingForm.controls['ispublic'].getRawValue();
    if(this.isPublicVal == true){
      this.settingForm.controls['ispublic'].setValue(1);
    }else{
      this.settingForm.controls['ispublic'].setValue(0);
    }
    
    this.approvalVal = this.settingForm.controls['approval'].getRawValue();
    if(this.approvalVal == true){
      this.settingForm.controls['approval'].setValue(1);
    }else{
      this.settingForm.controls['approval'].setValue(0);
    }
    
    this.pageService.updateSetting(id,this.settingForm.value).subscribe((data:any)=>{
      console.log(data);
      
    })

    this.dialogRef.close();
  }
}
