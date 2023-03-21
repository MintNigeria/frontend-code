import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../../services copy/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const authenticationToken: string | undefined =
      this.storageService.getItem('token');
    const helper = new JwtHelperService();
    const expirationDate = helper.isTokenExpired(authenticationToken);
    if (expirationDate || !authenticationToken) {
      this.storageService.removeItem('token');
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }
}
