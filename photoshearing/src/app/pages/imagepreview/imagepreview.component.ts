import { ArrayType } from '@angular/compiler';
import { Component,Inject,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PagesServiceService } from '../pages-service.service';

@Component({
  selector: 'app-imagepreview',
  templateUrl: './imagepreview.component.html',
  styleUrls: ['./imagepreview.component.css']
})
export class ImagepreviewComponent implements OnInit{
  public albumId:any = this.data.albumId;
  public imageId:any = this.data.imageId
  imageDetail:any = [];
  images:any = [];
  length:number = 0;
  currentIndex:number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ImagepreviewComponent>,
    private pageService:PagesServiceService
  ){};

  ngOnInit(): void {
    console.log(this.imageId);
    
    
    this.getAllImages(this.albumId,this.images);
    
    this.getSingleImage(this.imageId);

    
    
    
    
  }

  getAllImages(id:number,image:ArrayType){
    this.pageService.getAllImagesByAlbumIdPreview(id).subscribe((data:any)=>{
      console.log(data);
      
      this.images = data.data
      this.length = data.length
      this.findCurentIndex(this.imageId,this.images);
      
      
      // console.log(this.images);
      
      
    })
    
  }

  getSingleImage(id:number){
    this.pageService.getImageById(id).subscribe((data:any)=>{
      this.imageDetail = data.data;
      
    })

    
  }
  leftClick(){
    
    if(this.currentIndex == 0){
      this.currentIndex = this.images.length
    }
    this.currentIndex--;
    
    console.log(this.images[this.currentIndex].id);
    
    this.getSingleImage(this.images[this.currentIndex].id);
  }
  rightClick(){
    if(this.currentIndex == this.images.length-1){
      this.currentIndex = 0
    }
    this.currentIndex++;
    console.log(this.images[this.currentIndex].id);
    this.getSingleImage(this.images[this.currentIndex].id);
  }

  findCurentIndex(id:number,images:any){
    
    for (let i = 0; i < images.length; i++) {
      if(id == this.images[i].id){
        this.currentIndex  = i;
        
      }
    } // console.log("index",this.currentIndex);
    
  }
  
}
