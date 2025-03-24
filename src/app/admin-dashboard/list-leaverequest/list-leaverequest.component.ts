import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { EmployeeDetailsDialogComponent } from './employee-details-dialog/employee-details-dialog.component';
// import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EditBalanceDialogComponent } from '../edit-balance-dialog/edit-balance-dialog.component';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminService } from '../../services/adminService.service';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../services/notification.service';
// import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-list-leaverequest',
  imports: [CommonModule, MatTableModule, MatSortModule, FormsModule, MatPaginatorModule, MatMenuModule, MatIconModule],
  providers: [AdminService],
  templateUrl: './list-leaverequest.component.html',
  styleUrl: './list-leaverequest.component.scss',
})
export class ListLeaverequestComponent {
  
  private pollingInterval = 30000; // 30 seconds
  private pollingSubscription: any;

  searchTerm: string = '';
  currentFilterField: string = 'all';



  public departments: string[] = [];
  public leaveTypes: string[] = [];
  public statuses: string[] = [];



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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hoveredRow: any = null;
  @ViewChild(MatMenuTrigger) filterMenu!: MatMenuTrigger;


  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) { }

  async ngOnInit() {

    await this.loadData();
    this.startPolling();


    this.leaveRequests = await this.adminService.getAllLeaveRequests();
    this.notificationService.updateCount(this.getPendingCount());
    // await this.loadData();
    // const storedIds = localStorage.getItem('notifiedRequestIds');
    // this.previousPendingRequestIds = storedIds ? JSON.parse(storedIds) : [];

    this.leaveRequests = await this.adminService.getAllLeaveRequests();
    this.dataSource = new MatTableDataSource(this.leaveRequests);

    // Set up custom filter predicate
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return this.customFilter(data);
    };


    // Extract unique values for dynamic menus
    this.departments = [...new Set(this.leaveRequests.map((request: any) => request.user_Department))] as string[];
    this.leaveTypes = [...new Set(this.leaveRequests.map((request: any) => request.leave_Type))] as string[];
    this.statuses = [...new Set(this.leaveRequests.map((request: any) => request.status))] as string[];
    // this.notificationService.requestNotificationPermission();

    // Initialize with current pending IDs
    // this.updateNotifiedRequests();

    // Calculate pending requests
    // //const pendingCount = this.leaveRequests.filter(
    //   (request: any) =>
    //     request.status !== 'Approved' && request.status !== 'Rejected'
    // ).length;
    // this.notificationService.updateCount(pendingCount);

    // this.notificationService.requestNotificationPermission();

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Update ngOnDestroy
  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
  // Custom filter function
  private customFilter(data: any): boolean {
    if (!this.searchTerm) return true;

    const searchTerm = this.searchTerm.toLowerCase();
    const field = this.currentFilterField;

    if (field === 'all') {
      return (
        data.user_Name?.toLowerCase().includes(searchTerm) ||
        data.user_Department?.toLowerCase().includes(searchTerm) ||
        data.leave_Type?.toLowerCase().includes(searchTerm) ||
        data.status?.toLowerCase().includes(searchTerm)
      );
    } else {
      const fieldValue = data[field]?.toString().toLowerCase();
      return fieldValue?.includes(searchTerm);
    }
  }

  // Add this method to calculate pending requests
  private getPendingCount(): number {
    return this.leaveRequests.filter(
      (request: any) =>
        request.status !== 'Approved' &&
        request.status !== 'Rejected'
    ).length;
  }

  // Add filter label mapping
  getFilterLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'all': 'All Fields',
      'user_Name': 'Name (Contains)',
      'user_Name_startsWith': 'Name (Starts With)',
      'user_Name_endsWith': 'Name (Ends With)',
      'user_Department': 'Department',
      'leave_Type': 'Leave Type',
      'status': 'Status'
    };
    return labels[value] || 'All Fields';
  }
  // Update filter handling
  setFilter(filterField: string, filterValue?: string) {
    this.currentFilterField = filterField;
    if (filterValue !== undefined) {
      this.searchTerm = filterValue;
    }
    this.applyFilter();
  }

  // private updateNotifiedRequests() {
  //   const currentPending = this.getCurrentPendingRequests();
  //   const currentIds = currentPending.map((r: any) => r.id);
  //   localStorage.setItem('notifiedRequestIds', JSON.stringify(currentIds));
  //   // this.previousPendingRequestIds = currentIds;
  // }

  // private async loadLeaveRequests() {
  //   const allRequests = await this.adminService.getAllLeaveRequests() || [];

  //     // Sort by newest first using `createdAt`
  //   const sortedRequests = allRequests.sort((a, b) => {
  //   const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
  //   const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
  //   return dateB - dateA; // Descending order
  // });

  //   // this.leaveRequests = sortedRequests.slice(0, 10);
  //   this.dataSource = new MatTableDataSource(this.leaveRequests);
  //   return this.getCurrentPendingRequests();
  // }
  // private getCurrentPendingRequests() {
  //   return this.leaveRequests.filter(
  //     (request: any) =>
  //       request.status !== 'Approved' && request.status !== 'Rejected'
  //   );
  // }

  // private async checkForNewRequests() {
  // const currentPending = await this.loadLeaveRequests();
  // const currentIds = currentPending.map((r: any) => r.id);

  // Find new requests that haven't been notified
  // const newRequests = currentPending.filter(
  // (request: any) => !this.previousPendingRequestIds.includes(request.id)
  // );
  // if (newRequests.length > 0) {
  //   // Show notification for each new request
  //   newRequests.forEach((request: any) => {
  //     this.notificationService.showBrowserNotification(
  //       'New Leave Request',
  //       `${request.user_Name} from ${request.user_Department} submitted a leave request`
  //     );
  //   });
  //   // Update notified IDs
  //   this.previousPendingRequestIds = currentIds;
  //   localStorage.setItem('notifiedRequestIds', JSON.stringify(currentIds));

  //   // Update the count
  //   this.notificationService.updateCount(currentPending.length);

  //   // this.previousPendingCount = currentPending;
  // }

  // Add this method
  startPolling() {
    this.pollingSubscription = interval(this.pollingInterval).subscribe(() => {
      this.loadData();
    });
  }
  editBleance(totalDayAsked: number, name: string, id: number) {
    const dialogRef = this.dialog.open(EditBalanceDialogComponent, {
      width: '700px',
      height: '25rem',
      data: { totalDays: totalDayAsked, name: name, max: 10, id: id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
        this.notificationService.updateCount(this.getPendingCount());
      }
    });
  }

  //Reject Btn Logic
  rejectLeave(id: number) {
    // this.adminService.rejectLeave(id).subscribe((response: any) => {
    //   if (response && response.success) {
    //   this.loadData();
    //   this.notificationService.updateCount(this.getPendingCount());
    // });
    // console.log('Delete Leave');
    this.adminService.rejectLeave(id);
    this.ngOnInit();
  }

  //SerchBar
  applyFilter(event?: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  // Clear search
  async clearSearch() {
    this.searchTerm = '';
    this.currentFilterField = 'all';
    await this.loadData(); // Refresh data from API
    this.dataSource.filter = ''; // Clear any existing filters
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage(); // Reset to first page
    }
  }

  // Add new data loading method
  private async loadData() {
    this.leaveRequests = await this.adminService.getAllLeaveRequests();
    this.dataSource.data = this.leaveRequests; // Update table data

    // Refresh dynamic filter options
    this.departments = [...new Set(this.leaveRequests.map((request: any) => request.user_Department))] as string[];
    this.leaveTypes = [...new Set(this.leaveRequests.map((request: any) => request.leave_Type))] as string[];
    this.statuses = [...new Set(this.leaveRequests.map((request: any) => request.status))] as string[];
  }


  // Handle filter field change
  onFilterFieldChange() {
    // this.applyFilter();
  }

  //open dialog when click the row of emp.
  openEmployeeDetails(element: any): void {
    this.dialog.open(EmployeeDetailsDialogComponent, {
      width: '500px',
      data: element,
    });
  }
}