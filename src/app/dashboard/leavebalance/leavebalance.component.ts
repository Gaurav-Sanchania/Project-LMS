import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommomnService } from '../../services/commonService.service';

@Component({
  selector: 'app-leavebalance',
  imports: [CommonModule],
  providers: [CommomnService],
  templateUrl: './leavebalance.component.html',
  styleUrl: './leavebalance.component.css',
})
export class LeavebalanceComponent {
  constructor(private commonService: CommomnService) {
  }
  leaveBalance: { leaveType: string; leaveBalance: number; maxLeave: number }[] = [];

  async ngOnInit() {
    this.leaveBalance = await this.commonService.getLeaveBalance();
    // console.log(this.leaveBalance);
  }

  getProgressStyle(balance: number, max: number) {
    const progress = (balance / max) * 100;
    return {
      '--progress': `${progress}%`,
      '--color': this.getColor(progress),
    };
  }

  getColor(balance: number): string {
    if (balance >= 90) return '#2e7d32'; // Dark Green (Very High)
    if (balance >= 70) return '#4caf50'; // Green (High)
    if (balance >= 60) return '#009688'; // Teal (Fairly High)
    if (balance >= 50) return '#03a9f4'; // Blue (Moderate)
    if (balance >= 40) return '#ffeb3b'; // Yellow (Slightly Low)
    if (balance >= 30) return '#ff9800'; // Orange (Low)
    if (balance >= 20) return '#ff5722'; // Deep Orange (Very Low)
    return '#e91e63'; // Red (Critical)
  }  
}
