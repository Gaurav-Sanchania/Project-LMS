import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private pendingRequestsCount = new BehaviorSubject<number>(0);
  currentCount = this.pendingRequestsCount.asObservable();

  updateCount(count: number) {
    this.pendingRequestsCount.next(count);
  }
}
