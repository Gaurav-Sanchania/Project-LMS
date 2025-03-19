import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upcomingholidays',
  imports: [CommonModule],
  templateUrl: './upcomingholidays.component.html',
  styleUrl: './upcomingholidays.component.css'
})
export class UpcomingholidaysComponent {
  holidays: any = [
    {
      id: 1,
      name: 'New Year',
      date: '01-01-2021'
    },
    {
      id: 2,
      name: 'Christmas',
      date: '25-12-2021'
    },
    {
      id: 1,
      name: 'New Year',
      date: '01-01-2021'
    },
    {
      id: 2,
      name: 'Christmas',
      date: '25-12-2021'
    },
    {
      id: 1,
      name: 'New Year',
      date: '01-01-2021'
    },
    {
      id: 2,
      name: 'Christmas',
      date: '25-12-2021'
    },
    {
      id: 1,
      name: 'New Year',
      date: '01-01-2021'
    },
    {
      id: 2,
      name: 'Christmas',
      date: '25-12-2021'
    }
  ]
}
