import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddImageComponent } from '../add-image/add-image.component';
import { ImagepreviewComponent } from '../imagepreview/imagepreview.component';
import { PagesServiceService } from '../pages-service.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit{
  public userid: any = sessionStorage.getItem('id');
  id: number = 0;
  albumName: String = ''
  images:any = [];
  approval:number = 1;
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  searchText = '';
  sortBy: string = '';
  confirmalert:boolean = false;

  constructor(private route: ActivatedRoute,private pageService:PagesServiceService,private router: Router,public dialog: MatDialog){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id = params['albumid'] || this.id;
      

      
    })
    
    // this.id = this.route.snapshot.state.albumId;
    this.getAllImages(this.id,this.currentPage,'','');
    this.getAlbumName(this.id);
  }

  getAllImages(id:number,page:number,search:string,sortBy:string){
    this.pageService.getAllImagesByAlbumId(id,page,search,sortBy).subscribe((data:any)=>{
      this.images = data.data;
      console.log(this.images);
      this.totalPages = data.totalPages;
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    })
    
  }
  getAlbumName(id:number){
    this.pageService.getAlbumById(id).subscribe((data:any)=>{
      console.log(data);
      
      this.albumName = data.data.name;

      if(data.data.UserId == this.userid){
        this.approval = 1;
      }else{

      this.approval = data.data.Settings[0].approval;
      }
      
    })
  }
  addImage(){
    this.openAddImageDialog(this.id);
  }

  openAddImageDialog(albumId: number): void {
    
    const dialogRef = this.dialog.open(AddImageComponent, {
      width: '775px',
      data: { albumId }
      
      
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        
        this.getAllImages(this.id,this.currentPage,'','');
      }
      
    });
  }
  openImagePreview(imageId:number,albumId:number): void{
    const dialogRef = this.dialog.open(ImagepreviewComponent,{
      width:'774px',
      data: {imageId,albumId}
    })
  }

  sort(){
    this.getAllImages(this.id,1,this.searchText,this.sortBy);
  }
  search(){
    if(this.searchText != undefined)
    this.getAllImages(this.id,1,this.searchText,this.sortBy)
  }
  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.getAllImages(this.id,this.currentPage,this.searchText,this.sortBy);
    }
  }
  nextPage(){
    if(this.currentPage<this.totalPages){
      this.currentPage++;
      this.getAllImages(this.id,this.currentPage,this.searchText,this.sortBy);
    }
  }
  goToPage(page: number){
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllImages(this.id,this.currentPage, this.searchText,this.sortBy);
    }
  }

  deleteImage(id:number,UseId:number){
    console.log(UseId);
    
    if(UseId == this.userid){
      this.confirmalert = confirm("Do you want to delete this Album?");
      if(this.confirmalert == true){
    this.pageService.deleteImageById(id).subscribe((data:any)=>{
      this.getAllImages(this.id,this.currentPage,'','');
      
    })
  }
  }else{
    alert("You are not allow to delete this image");
  }
  }



}
