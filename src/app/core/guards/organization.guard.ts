import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class OrganizationGuard implements CanActivateChild {
  loggedInUser: any;
  constructor(private router: Router) {

  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authenticationToken: any = localStorage.getItem('token');
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(authenticationToken);

    if (this.loggedInUser.UserType !== 'Organization') {
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
