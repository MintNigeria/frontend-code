import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionGuard implements CanActivateChild {
  loggedInUser: any;
  constructor(private router: Router) {

  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authenticationToken: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(authenticationToken);

    if (this.loggedInUser.UserType !== 'Institution') {
      this.router.navigate(['/']);
      return false;
    }

    const expirationDate = helper.isTokenExpired(String(authenticationToken));
    if (expirationDate || !authenticationToken) {
      localStorage.removeItem('token');
    }
    return true;
  }
  
}
