import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesServiceService } from '../pages-service.service';
import { AddAlbumPopupComponent } from '../add-album-popup/add-album-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public id: any = sessionStorage.getItem('id');
  user: any = [];
  count:any = 0;
  aCount:any = 0;
  public currentUrl:any = this.router.url;
  constructor(private router: Router, private pageService: PagesServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.currentUrl);
    
    this.getOneUser(this.id)
    this.countSheardAlbum(this.id);
    this.albumCount(this.id);
  }
  token = sessionStorage.getItem('token');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`,
    })
  };
  clicked() {
    this.router.navigate(['/admin/update']);
  }

  getOneUser(id: number) {

    this.pageService.getOneUser(id, this.httpOptions).subscribe((data: any) => {
      // console.log(data);

      this.user = data.data;
    })
  }

  openAddAlbumDialog(): void {
    const dialogRef = this.dialog.open(AddAlbumPopupComponent, {
      width: '250px',
      position: {
        top: '400px',
        right: '200px',
      }

    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
  countSheardAlbum(id:number){
    this.pageService.getCountShardAlbum(id).subscribe((data:any)=>{
      this.count = data.data;
      
    })
  }
  sheardHistory(){
    this.router.navigate(['/admin/sharedHistory']);
  }

  albumCount(id:number){
    this.pageService.getAlbumById(id).subscribe((data:any)=>{
      this.aCount = data.countdata
      
    })
  }

}
