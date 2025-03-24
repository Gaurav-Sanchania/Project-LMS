import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommomnService } from '../../services/commonService.service';
import { UserService } from '../../services/userService.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-leavehistory',
  imports: [CommonModule, MatTableModule, MatSortModule],
  providers: [CommomnService, UserService],
  templateUrl: './leavehistory.component.html',
  styleUrl: './leavehistory.component.css'
})
export class LeavehistoryComponent {
  public leavehistory: any = [];
  dataSource = new MatTableDataSource([]);
  constructor(private commonService: CommomnService, private userService: UserService, private route: Router, private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.leavehistory = await this.commonService.getLeavesForUser();
    this.dataSource = new MatTableDataSource(this.leavehistory);
    // console.log(this.leavehistory);
  }
  
  displayedColumns: string[] = ['startDate', 'endDate', 'leaveType', 'status', 'Action'];
  
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewChecked() {
    this.dataSource.sort = this.sort;
  }

  async editLeave(leaveId: number) {
    // console.log('Edit Leave', leaveId);
    const leave = await this.commonService.getLeaveById(leaveId);
    // console.log('Fetched Leave:', leave);
    this.route.navigate(["leaveRequest", leave]);
  }
  viewLeave(leaveId: number) {
    // console.log(leaveId);
    this.openDialog(leaveId);
  }
  deleteLeave(leaveId: number) {
    // console.log('Delete Leave', leaveId);
    this.openDialog(leaveId);
    // this.ngOnInit();
  }
  openDialog(leaveId: number) {
    this.dialog.open(ConfirmDialogComponent, {
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '300ms',
      panelClass: 'slide-dialog',
      data: { leaveId: leaveId }
    });
  }
}
