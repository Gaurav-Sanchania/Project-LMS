import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CommomnService } from '../../services/commonService.service';
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
  @Input() selectedDate!: Date;
  constructor(private commonService: CommomnService, private dialog: MatDialog) {
  }

  async fetchData() {
    if (!this.selectedDate){
      this.EmployeeList = await this.commonService.getEmployeeOnLeave();
      // console.log(this.EmployeeList);
    } else {
        this.EmployeeList = await this.commonService.getEmployeeOnLeaveDate(this.selectedDate);
    }
  }
  
  ngOnInit() {
    this.fetchData();
  }
  
  ngOnChanges(changes: SimpleChanges) {
      if (changes['selectedDate']) {
        this.fetchData();
      }
  }
}
