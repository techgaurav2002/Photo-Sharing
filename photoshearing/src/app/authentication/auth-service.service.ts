import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  createurl:string = 'http://localhost:3000/user';
  signup(data:any){
    // console.log(data)
    return this.http.post(this.createurl,data);
    
  }
  loginurl:string = 'http://localhost:3000/login';

  login(data:any){
    return this.http.post(this.loginurl,data);
  }

  forgoturl:string = 'http://localhost:3000/forgot';

  forgotPassword(data:any){
    return this.http.post(this.forgoturl,data);
  }

  resetUrl:string = 'http://localhost:3000/reset-password';

  resetPassword(token:any,data:any){
    return this.http.post(`${this.resetUrl}/${token}`,data)
  }


  public isLoggedIn()
{
  let tokenStr=sessionStorage.getItem('token');
  if(tokenStr==undefined || tokenStr==''||tokenStr==null){
    return false
  }else{
    return true;
  }
}
}
