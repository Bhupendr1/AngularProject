import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
loggedIn:boolean=false;
login(){
    this.loggedIn=true;
}
logOut(){
    this.loggedIn=false;
}
isAuthenticated(){
   return this.loggedIn;
}
}
