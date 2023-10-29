import { Component, OnInit } from '@angular/core';
import { PagesServiceService } from '../pages-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SettingComponent } from '../setting/setting.component';

@Component({
  selector: 'app-sheard-histoy',
  templateUrl: './sheard-histoy.component.html',
  styleUrls: ['./sheard-histoy.component.css']
})
export class SheardHistoyComponent implements OnInit{
  public userId:any = sessionStorage.getItem('id');
  albums:any = [];
  currentPage = 1;
  totalPages = 1;
  totalPagesArray: number[] = [];
  searchText = '';
  sortBy: string = '';
constructor(private pageService:PagesServiceService,public dialog: MatDialog){}
ngOnInit(): void {
  this.getSheardAlbum(this.userId,this.currentPage,'','');
}
getSheardAlbum(userId:any,page:number,search:string,sortBy:string){
  this.pageService.getHistory(userId,page,search,sortBy).subscribe((data:any)=>{
    this.albums = data.data
    console.log(this.albums);
    this.totalPages = data.totalPages;
      this.totalPagesArray = Array.from({length: this.totalPages},(_, i)=> i+1)
  })
}
sort(){
    
  this.getSheardAlbum(this.userId,1,this.searchText,this.sortBy);
}
search(){
  if(this.searchText != undefined){
    this.getSheardAlbum(this.userId,1,this.searchText,this.sortBy)
  }
}
prevPage(){
  if(this.currentPage > 1){
    this.currentPage--;
    this.getSheardAlbum(this.userId,this.currentPage,this.searchText,this.sortBy);
  }
}
goToPage(page:number){
  if (page >= 1 && page <= this.totalPages){
    this.currentPage = page;
    this.getSheardAlbum(this.userId,this.currentPage,this.searchText,this.sortBy);
  }
}
nextPage(){
  if(this.currentPage < this.totalPages){
    this.currentPage++;
    this.getSheardAlbum(this.userId,this.currentPage,this.searchText,this.sortBy);
  }
}
}
