import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

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
  styleUrl: './list-leaverequest.component.scss'
})
export class ListLeaverequestComponent {
  public leaveRequests: any = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['user_Name', 'user_Department', 'startDate', 'endDate', 'totalDays', 'leave_Type', 'reason', 'status', 'action'];
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private dialog: MatDialog, private adminService: AdminService) {
  } 

  async ngOnInit() {
    this.leaveRequests = await this.adminService.getAllLeaveRequests();
    this.dataSource = new MatTableDataSource(this.leaveRequests);
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
