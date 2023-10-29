import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../authentication/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGurdService implements CanActivate{

  constructor(private authService:AuthServiceService,private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if(this.authService.isLoggedIn()){
        return true
      }
      this.router.navigate(['login']);
      return false;

  }
}
