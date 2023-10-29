import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  public active:number = 1;

  constructor() { }

  changeBedcrum(sign:number){
    this.active = sign
  }
}
