import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeDetailsDialogComponent } from './employee-details-dialog/employee-details-dialog.component';
import { NotificationService } from '../../services/notification.service';

import { MatDialog } from '@angular/material/dialog';
import { EditBalanceDialogComponent } from '../edit-balance-dialog/edit-balance-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminService } from '../../services/adminService.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-leaverequest',
  imports: [CommonModule, MatTableModule, MatSortModule, FormsModule],
  providers: [AdminService],
  templateUrl: './list-leaverequest.component.html',
  styleUrl: './list-leaverequest.component.scss',
})
export class ListLeaverequestComponent {
  private previousPendingRequestIds: number[] = [];
  private previousPendingCount = 0;
  private pollingInterval = 50000; // 30 seconds
  public leaveRequests: any = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'user_Name',
    'user_Department',
    'startDate',
    'endDate',
    'totalDays',
    'leave_Type',
    'status',
    'action',
  ];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    const storedIds = localStorage.getItem('notifiedRequestIds');
    this.previousPendingRequestIds = storedIds ? JSON.parse(storedIds) : [];

    this.leaveRequests = await this.adminService.getAllLeaveRequests();
    this.dataSource = new MatTableDataSource(this.leaveRequests);

    this.notificationService.requestNotificationPermission();
    await this.loadLeaveRequests();
    this.startPolling();
    // Initialize with current pending IDs
    this.updateNotifiedRequests();

    // Calculate pending requests
    const pendingCount = this.leaveRequests.filter(
      (request: any) =>
        request.status !== 'Approved' && request.status !== 'Rejected'
    ).length;
    this.notificationService.updateCount(pendingCount);

    this.notificationService.requestNotificationPermission();
    await this.loadLeaveRequests();
    this.startPolling();
  }

  private updateNotifiedRequests() {
    const currentPending = this.getCurrentPendingRequests();
    const currentIds = currentPending.map((r: any) => r.id);
    localStorage.setItem('notifiedRequestIds', JSON.stringify(currentIds));
    this.previousPendingRequestIds = currentIds;
  }

  private startPolling() {
    setInterval(async () => {
      await this.loadLeaveRequests();
      this.checkForNewRequests();
    }, this.pollingInterval);
  }

  private async loadLeaveRequests() {
    this.leaveRequests = await this.adminService.getAllLeaveRequests();
    this.dataSource = new MatTableDataSource(this.leaveRequests);
    return this.getCurrentPendingRequests();
  }
  private getCurrentPendingRequests() {
    return this.leaveRequests.filter(
      (request: any) =>
        request.status !== 'Approved' && request.status !== 'Rejected'
    );
  }

  private async checkForNewRequests() {
    const currentPending = await this.loadLeaveRequests();
    const currentIds = currentPending.map((r: any) => r.id);

    // Find new requests that haven't been notified
    const newRequests = currentPending.filter(
      (request: any) => !this.previousPendingRequestIds.includes(request.id)
    );
    if (newRequests.length > 0) {
      // Show notification for each new request
      newRequests.forEach((request: any) => {
        this.notificationService.showBrowserNotification(
          'New Leave Request',
          `${request.user_Name} from ${request.user_Department} submitted a leave request`
        );
      });
      // Update notified IDs
      this.previousPendingRequestIds = currentIds;
      localStorage.setItem('notifiedRequestIds', JSON.stringify(currentIds));

      // Update the count
      this.notificationService.updateCount(currentPending.length);

      // this.previousPendingCount = currentPending;
    }
  }

  ngAfterViewChecked() {
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.dataSource.sort = this.sort;
  }

  editBleance(totalDayAsked: number, name: string, id: number) {
    const dialogRef = this.dialog.open(EditBalanceDialogComponent, {
      width: '700px',
      height: '25rem',
      data: { totalDays: totalDayAsked, name: name, max: 10, id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log('Save clicked');
      }
    });
  }

  approveLeave(id: number) {
    // console.log('Approve Leave');
    this.adminService.approveLeave(id);
    // console.log(id);
    this.ngOnInit();
  }

  rejectLeave(id: number) {
    // console.log('Delete Leave');
    this.adminService.rejectLeave(id);
    this.ngOnInit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEmployeeDetails(element: any): void {
    this.dialog.open(EmployeeDetailsDialogComponent, {
      width: '500px',
      data: element,
    });
  }

  // leavehistory: { name: string; department: string; startDate: string; endDate: string; totalDay: number;
  //   type: string; reason: string; status: string
  //  }[] = [
  //   {
  //     name: 'John Doe',
  //     department: 'Angular',
  //     startDate: '2021-01-01',
  //     endDate: '2021-01-02',
  //     totalDay: 10,
  //     type: 'Annual Leave',
  //     reason: 'Family Gathering',
  //     status: 'Approved'
  //   },
  //   {
  //     name: 'Emmly Doe',
  //     department: 'dotnet',
  //     startDate: '2021-02-01',
  //     endDate: '2021-02-02',
  //     totalDay: 2,
  //     type: 'Sick Leave',
  //     reason: 'Fever',
  //     status: 'Approved'
  //   },
  //   {
  //     name: 'joe Doe',
  //     department: 'AI',
  //     startDate: '2021-03-01',
  //     endDate: '2021-03-02',
  //     totalDay: 6,
  //     type: 'Annual Leave',
  //     reason: 'Family Gathering',
  //     status: 'Approved'
  //   }
  // ];
}
