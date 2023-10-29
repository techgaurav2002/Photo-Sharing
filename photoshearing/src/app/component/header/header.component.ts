import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentService } from '../component.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public  token:any= sessionStorage.getItem('token');
  public  email:any= sessionStorage.getItem('email');
  public  id:any= sessionStorage.getItem('id');
  active:number = 1;
  constructor(private router:Router,public cService:ComponentService,private snackBar: MatSnackBar){

  }
  logout(){
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('id');
    this.openSnackBar('Logout Successfull','Close')
    this.router.navigate([""])

  }

  myalbum(sign:number){
    this.cService.changeBedcrum(sign)
    this.active = this.cService.active
    this.router.navigate(['admin/albums'])
    
    
  }
  profile(sign:number){
    this.cService.changeBedcrum(sign)
    this.active = this.cService.active
    this.router.navigate(['admin'])
    
  }

  sheardAlbum(sign:number){
    this.cService.changeBedcrum(sign);
    this.active = this.cService.active
    this.router.navigate(['admin/sheardAlbum'])
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
