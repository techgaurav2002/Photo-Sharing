import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentService } from '../component.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
 constructor(private route:Router,public cService:ComponentService ){}

 ngOnInit(): void {
     this.Url = this.cService.active;
 }

 Url:any = 1;

 profile(sign:number){
  this.cService.changeBedcrum(sign)
  this.Url = this.cService.active;
   this.route.navigate(['admin'])
   
   
 }

myalbum(sign:number){
  this.cService.changeBedcrum(sign)
  this.Url = this.cService.active;
  this.route.navigate(['admin/albums'])
  
  
}
sheardAlbum(sign:number){
  this.cService.changeBedcrum(sign)
  this.Url = this.cService.active;
  this.route.navigate(['admin/sheardAlbum'])
  
  
}

}
