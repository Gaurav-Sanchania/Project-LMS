import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommomnService } from '../../services/commonService.service';

@Component({
  selector: 'app-upcomingholidays',
  imports: [CommonModule],
  providers: [CommomnService],
  templateUrl: './upcomingholidays.component.html',
  styleUrl: './upcomingholidays.component.css'
})
export class UpcomingholidaysComponent {
  constructor(private commonService: CommomnService){}
  public holidays: any = [];

  async ngOnInit() {
    this.holidays = await this.commonService.getAllHolidays();
    // console.log(this.holidays);
  }

  // holidays: any = [
  //   {
  //     id: 1,
  //     name: 'New Year',
  //     date: '01-01-2021'
  //   },
  //   {
  //     id: 2,
  //     name: 'Christmas',
  //     date: '25-12-2021'
  //   },
  //   {
  //     id: 1,
  //     name: 'New Year',
  //     date: '01-01-2021'
  //   },
  //   {
  //     id: 2,
  //     name: 'Christmas',
  //     date: '25-12-2021'
  //   },
  //   {
  //     id: 1,
  //     name: 'New Year',
  //     date: '01-01-2021'
  //   },
  //   {
  //     id: 2,
  //     name: 'Christmas',
  //     date: '25-12-2021'
  //   },
  //   {
  //     id: 1,
  //     name: 'New Year',
  //     date: '01-01-2021'
  //   },
  //   {
  //     id: 2,
  //     name: 'Christmas',
  //     date: '25-12-2021'
  //   }
  // ]
}
