import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorGuard implements CanActivate {

  constructor(
    // public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user= localStorage.getItem('role');
      console.log(user);
      if (user !== 'vendor'){
        window.alert("Denied Access!");
        this.router.navigate(['/'])
      }
     
     return true;
  }
  
}
