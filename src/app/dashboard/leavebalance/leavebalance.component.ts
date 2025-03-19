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
  leaveBalance: { leaveType: string; leaveBalance: number }[] = [];

  async ngOnInit() {
    this.leaveBalance = await this.commonService.getLeaveBalance();
    // console.log(this.leaveBalance);
  }

  // leaveBalance: any = [
  //   {
  //     leaveType: 'Casual Leave',
  //     balance: 10,
  //   },
  //   {
  //     leaveType: 'Sick Leave',
  //     balance: 50,
  //   },
  //   {
  //     leaveType: 'Earned Leave',
  //     balance: 35,
  //   },
  //   {
  //     leaveType: 'Maternity Leave',
  //     balance: 85,
  //   },
  // ];

  getProgressStyle(balance: number) {
    return {
      '--progress': `${balance}%`,
      '--color': this.getColor(balance),
    };
  }

  getColor(balance: number): string {
    if (balance >= 70) return '#4caf50'; // Green for high balance
    if (balance >= 50) return '#03a9f4'; // Blue for moderate balance
    if (balance >= 30) return '#ff9800'; // Orange for low balance
    return '#e91e63'; // Red for very low balance
  }
}
