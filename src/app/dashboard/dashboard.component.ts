import { Component } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { PiechartComponent } from './piechart/piechart.component';
import { LeavehistoryComponent } from "./leavehistory/leavehistory.component";
import { UpcomingholidaysComponent } from "./upcomingholidays/upcomingholidays.component";
import { LeavebalanceComponent } from "./leavebalance/leavebalance.component";
import { EmployeelistComponent } from "./employeelist/employeelist.component";
// import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-dashboard',
  imports: [CalendarComponent, PiechartComponent, LeavehistoryComponent, UpcomingholidaysComponent, LeavebalanceComponent, EmployeelistComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedDate: Date = new Date();

  onDateChange(date: Date) {
    this.selectedDate = date;
  }
}
