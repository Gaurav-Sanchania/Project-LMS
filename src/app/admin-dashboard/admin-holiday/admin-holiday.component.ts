import { Component } from '@angular/core';
import { CommomnService } from '../../services/commonService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-holiday',
  imports: [CommonModule],
  templateUrl: './admin-holiday.component.html',
  styleUrl: './admin-holiday.component.scss'
})
export class AdminHolidayComponent {
   constructor(private commonService: CommomnService){}
    public holidays: any = [];
  
    async ngOnInit() {
      this.holidays = await this.commonService.getAllHolidays();
      // console.log(this.holidays);
    }

}
