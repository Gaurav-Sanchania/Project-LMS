import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './services/authService.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Request notification permission when component loads
    this.notificationService.requestPermission();
  }

  sendNotification(): void {
    this.notificationService.showNotification(
      'New Message',
      'You have a new message from Angular App! 🎉'
    );
  }
}
