import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommomnService } from '../../services/commonService.service';
import { UserService } from '../../services/userService.service';

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
  constructor(private commonService: CommomnService, private userService: UserService) {
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
  
  // filteredDataSource = new MatTableDataSource(this.dataSource.data);
  // applyFilter(event: Event, column: string) {
  //   const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  //   this.filteredDataSource.data = this.dataSource.data.filter(item =>
  //     (item as { [key: string]: string })[column].toLowerCase().includes(filterValue)
  //   );
  // }

  editLeave(Leave: any) {
    console.log('Edit Leave');
  }
  deleteLeave(leaveId: number) {
    // console.log('Delete Leave', leaveId);
    this.userService.deleteLeaveById(leaveId);
    this.ngOnInit();
  }

  // leavehistory: { startDate: string, endDate: string, type: string, reason: string, status: string }[] = [
  //   {
  //     startDate: '2021-01-01',
  //     endDate: '2021-01-02',
  //     type: 'Annual Leave',
  //     reason: 'Family Gathering',
  //     status: 'Approved'
  //   },
  //   {
  //     startDate: '2021-02-01',
  //     endDate: '2021-02-02',
  //     type: 'Sick Leave',
  //     reason: 'Fever',
  //     status: 'Approved'
  //   },
  //   {
  //     startDate: '2021-03-01',
  //     endDate: '2021-03-02',
  //     type: 'Annual Leave',
  //     reason: 'Family Gathering',
  //     status: 'Rejected'
  //   }
  // ];
}
