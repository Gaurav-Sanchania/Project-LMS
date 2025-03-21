import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommomnService } from '../../services/commonService.service';
import { EmployeeDetailsDialogComponent } from './employee-details-dialog/employee-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-employeelist',
  imports: [CommonModule],
  providers: [CommomnService],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent {
  EmployeeList: any = [];
  constructor(private commonService: CommomnService, private dialog: MatDialog) {
  }

  async ngOnInit() {
    this.EmployeeList = await this.commonService.getEmployeeOnLeave();
    // console.log(this.EmployeeList);
  }


    openEmployeeDetails(element: any): void {
      this.dialog.open(EmployeeDetailsDialogComponent, {
        width: '500px',
        data: element
      });
    }
}
