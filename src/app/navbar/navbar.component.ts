import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../services/loginService.service';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  providers: [LoginService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  pendingRequestsCount = 0;
  private countSubscription!: Subscription;

  constructor(
    private route: Router,
    private loginService: LoginService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.countSubscription = this.notificationService.currentCount.subscribe(
      (count) => (this.pendingRequestsCount = count)
    );
  }

  ngOnDestroy() {
    this.countSubscription.unsubscribe();
  }

  empOrNot(): boolean {
    const userType = this.loginService.getUserType();
    // console.log(userType);

    if (userType) {
      if (userType == 'Employee') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  clearLocalStorage() {
    localStorage.clear();
    setTimeout(() => {
      this.route.navigate(['/login']);
  }, 100); 
  }
}
