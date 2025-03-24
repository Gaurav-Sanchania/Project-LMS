import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AllusersComponent } from "../allusers/allusers.component";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminService } from '../services/adminService.service';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-leave-layout',
  imports: [NavbarComponent, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './leave-layout.component.html',
  styleUrl: './leave-layout.component.scss'
})
export class LeaveLayoutComponent {
  public leaveRequests: any = []; // Change from userList to leaveRequests
  public userList: any = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'user_Name',
    'user_Department',
    'startDate',
    'endDate',
    'totalDays',
    'leave_Type',
    'status'
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hoveredRow: any = null;

  constructor(private adminService: AdminService) { }

  async ngOnInit() {
    this.leaveRequests = await this.adminService.getAllLeaveRequests(); // Fetch leave requests
    // this.userList = await this.adminService.getAllUsers();
    this.dataSource = new MatTableDataSource(this.leaveRequests);
    // console.log(this.userList);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
