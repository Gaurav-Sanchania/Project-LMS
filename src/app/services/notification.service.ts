import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private countSource = new BehaviorSubject<number>(0);
  currentCount = this.countSource.asObservable();
  private pendingRequestsCount = new BehaviorSubject<number>(0);
  private notificationSound = new Audio('assets/notification.mp3');
  // currentCount = this.pendingRequestsCount.asObservable();

  updateCount(count: number) {
    this.countSource.next(count);
  }
  showBrowserNotification(title: string, message: string) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body: message,
        icon: 'download.png',
      });

      notification.addEventListener('click', () => {
        window.open('http://localhost:4200/admin/dashboard')
      })

      setTimeout(() => {
        notification.close();
      }, 4000)

      this.notificationSound.play();
    }
  }

  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
}
