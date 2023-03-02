import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean{
    if (this.authService.isAuthenticated()) {
        return true;
    }else{
        this.router.navigate(['']);
        return false;
    }
  }

//   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
//   boolean {
//     return this.canActivate(route, state);
//   }
}
