import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesServiceService } from '../pages-service.service';

@Component({
  selector: 'app-sheard-album',
  templateUrl: './sheard-album.component.html',
  styleUrls: ['./sheard-album.component.css']
})
export class SheardAlbumComponent implements OnInit{
  public userId:any = sessionStorage.getItem('id');
  public email:any = sessionStorage.getItem('email');
  albums:any = [];
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  searchText = '';
  sortBy: string = '';
  public currentUrl:any = this.router.url;

  constructor(private pageService:PagesServiceService,private router: Router){};


  ngOnInit(): void {

    console.log(this.currentUrl);
    

      this.getSheardAlbum(this.email,this.currentPage,'','');
  }
  getSheardAlbum(email:any,page:number,search:string,sortBy:string){
    this.pageService.getSheardAlbum(email,page,search,sortBy).subscribe((data:any)=>{
      this.albums = data.data
      console.log(this.albums);
      this.totalPages = data.totalPages;
      this.totalPagesArray = Array.from({length: this.totalPages},(_, i)=> i+1)
      
    })
  }

  sort(){
    
    this.getSheardAlbum(this.email,1,this.searchText,this.sortBy);
  }

  search(){
    if(this.searchText != undefined){
      this.getSheardAlbum(this.email,1,this.searchText,this.sortBy)
    }
  }
  prevPage(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.getSheardAlbum(this.email,this.currentPage,this.searchText,this.sortBy);
    }
  }
  goToPage(page:number){
    if (page >= 1 && page <= this.totalPages){
      this.currentPage = page;
      this.getSheardAlbum(this.email,this.currentPage,this.searchText,this.sortBy);
    }
  }
  nextPage(){
    if(this.currentPage < this.totalPages){
      this.currentPage++;
      this.getSheardAlbum(this.email,this.currentPage,this.searchText,this.sortBy);
    }
  }

  // allImages(albumId: number) {
  //   const navigationWithData = {
  //     state: {
  //       albumId: albumId
  //     }
  //   };

  //   this.router.navigate(['admin/images'], navigationWithData);
  // }

  getid(id:number){
    this.router.navigate(['/admin/images'],{queryParams:{albumid:id}})
    
  }


  
}
