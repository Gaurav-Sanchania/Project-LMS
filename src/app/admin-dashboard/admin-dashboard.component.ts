import { Component } from '@angular/core';
import { LeavebalanceComponent } from "../dashboard/leavebalance/leavebalance.component";

import { EmployeelistComponent } from "../dashboard/employeelist/employeelist.component";
import { AdminCalendarComponent } from "./admin-calendar/admin-calendar.component";
import { PiechartComponent } from "../dashboard/piechart/piechart.component";
import { ListLeaverequestComponent } from "./list-leaverequest/list-leaverequest.component";
import { CommomnService } from '../services/commonService.service';
import { AdminHolidayComponent } from "./admin-holiday/admin-holiday.component";


@Component({
  selector: 'app-admin-dashboard',
  imports: [EmployeelistComponent, AdminCalendarComponent, PiechartComponent, ListLeaverequestComponent, AdminHolidayComponent],
  providers: [CommomnService],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private commonService: CommomnService) {
  }

  ngOnInit() {
    const count = this.commonService.getCountOnPresent();
    // console.log(count);
  }
}
