// notification.service.ts (Optional: You can create a service to handle notifications)
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor() {}

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
