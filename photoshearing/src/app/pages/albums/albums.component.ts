import { Component, OnInit } from '@angular/core';
import { PagesServiceService } from '../pages-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingComponent } from '../setting/setting.component';
import { SheardPopupComponent } from '../sheard-popup/sheard-popup.component';
import { Router } from '@angular/router';
import { AddAlbumPopupComponent } from '../add-album-popup/add-album-popup.component';
import { ComponentService } from 'src/app/component/component.service';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
})
export class AlbumsComponent implements OnInit{
  

  public  userId:any= sessionStorage.getItem('id');
  albums:any = [];
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  searchText = '';
  sortBy: string = '';
  public currentUrl:any = this.router.url;
  confirmalert:boolean = false;
  constructor(private router: Router,private pageService:PagesServiceService,public dialog: MatDialog,private cService:ComponentService){}

  ngOnInit(): void {
    
    console.log(this.currentUrl);
    this.getAllAlbum(this.userId,this.currentPage,'','');
  }


  getAllAlbum(userId:any,page:number,search: string,sortBy:string){
    this.pageService.getAllAlbums(userId,page,search,sortBy).subscribe((data: any) => {
      
      this.albums = data.data
      console.log(this.albums);
      
      this.totalPages = data.totalPages;
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      
    });
  }
  openAddAlbumDialog(albumId: number): void {
    
    const dialogRef = this.dialog.open(SettingComponent, {
      width: '300px',
      data: { albumId }
      // position: {
      //   top: '400px',
      //   right: '200px',
      // }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
    });
  }
  openAddAlbumDialog2(): void {
    const dialogRef = this.dialog.open(AddAlbumPopupComponent, {
      width: '250px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        
        this.getAllAlbum(this.userId,this.currentPage,'','');
      }

    });
  }

  openSheardPopup(albumId: number){
    const dialogRef = this.dialog.open(SheardPopupComponent,{
      width: '325px',
      data: {albumId}
    });
    dialogRef.afterClosed().subscribe(result =>{

    });
  }

  deleteAlbum(id:number){
    this.confirmalert = confirm("Do you want to delete this Album?");
    if(this.confirmalert == true){
    this.pageService.deleteAlbumById(id).subscribe((data:any)=>{
      console.log(data);
      this.getAllAlbum(this.userId,this.currentPage,'','');
      
    })
  }else{

  }
  }
  sort() {
    
    this.getAllAlbum( this.userId,1, this.searchText,this.sortBy);
}
  search(){
    if(this.searchText != undefined)
    this.getAllAlbum(this.userId,1, this.searchText,this.sortBy);
  }

  prevPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllAlbum(this.userId,this.currentPage, this.searchText,this.sortBy);
    }
  }
  goToPage(page: number){
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllAlbum(this.userId,this.currentPage, this.searchText,this.sortBy);
    }
  }

  nextPage(){
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getAllAlbum(this.userId,this.currentPage, this.searchText,this.sortBy);
    }
  }

  getid(id:number){
    this.router.navigate(['/admin/images'],{queryParams:{albumid:id}})
    
  }


  

}
