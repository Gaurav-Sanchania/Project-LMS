import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private countSource = new BehaviorSubject<number>(0);
  currentCount = this.countSource.asObservable();
  // private pendingRequestsCount = new BehaviorSubject<number>(0);
  private notificationSound = new Audio('');
 

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
      }, 5000)

      this.notificationSound.play();
    }
  }

  requestNotificationPermission() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }


  // Request permission from the user
  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          // console.log('Notification permission granted.');
        } else {
          // console.log('Notification permission denied.');
        }
      });
    } else {
      // console.log('Browser does not support notifications.');
    }
  }

  // Show notification
  showNotification(title: string, body: string): void {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: 'assets/icons/notification-icon.png', // Optional icon
      });
    }
  }
}
