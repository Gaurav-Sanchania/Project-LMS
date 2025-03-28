import { Component } from '@angular/core';
import { LeavebalanceComponent } from "../dashboard/leavebalance/leavebalance.component";

import { EmployeelistComponent } from "../dashboard/employeelist/employeelist.component";
import { AdminCalendarComponent } from "./admin-calendar/admin-calendar.component";
import { PiechartComponent } from "../dashboard/piechart/piechart.component";
import { ListLeaverequestComponent } from "./list-leaverequest/list-leaverequest.component";
import { CommomnService } from '../services/commonService.service';
import { AdminHolidayComponent } from "./admin-holiday/admin-holiday.component";
import { CalendarComponent } from "../dashboard/calendar/calendar.component";


@Component({
  selector: 'app-admin-dashboard',
  imports: [EmployeelistComponent,  PiechartComponent, ListLeaverequestComponent, AdminHolidayComponent, CalendarComponent],
  providers: [CommomnService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  selectedDate: Date = new Date();

  onDateChange(date: Date) {
    this.selectedDate = date;
  }
  constructor(private commonService: CommomnService) {
  }

  ngOnInit() {
    const count = this.commonService.getCountOnPresent();
    // console.log(count);
  }
}
