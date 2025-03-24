import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Example: Check if user is logged in (you can modify this logic)
    const isAuthenticated = localStorage.getItem('user') ? true : false;

    if (isAuthenticated) {
      return true; // Allow access
    } else {
      this.router.navigate(['/login']);
      return false; // Redirect to login if not authenticated
    }
  }
}
