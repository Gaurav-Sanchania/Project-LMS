import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { CommomnService } from '../../services/commonService.service';
Chart.register(...registerables); 

@Component({
  selector: 'app-piechart',
  imports: [],
  providers: [CommomnService],
  templateUrl: './piechart.component.html',
  styleUrl: './piechart.component.css'
})
export class PiechartComponent {
  @Input() selectedDate!: Date;
  constructor(private commonService: CommomnService) {
  }

  private countOnPresent: any;
  private countOnLeave: any;

  async fetchData() {
    if (!this.selectedDate){
      this.countOnPresent = await this.commonService.getCountOnPresent();
      this.countOnLeave = await this.commonService.getCountOnLeave();
    } else {
      this.countOnPresent = await this.commonService.getCountOnDate(this.selectedDate);
      this.countOnLeave = await this.commonService.getCountOnLeaveDate(this.selectedDate);
    }
    this.createPieChart();
  }

  ngOnInit() {
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate']) {
      this.fetchData();
    }
  }

  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  private chart!: Chart;
  
  createPieChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const data: ChartData<'pie'> = {
      labels: ['On Leave', 'Present'],
      datasets: [
        {
          data: [this.countOnLeave, this.countOnPresent],
          backgroundColor: ['#36A2EB', '#FFCE56']
        }
      ]
    };
    
    const config: ChartConfiguration<'pie'> = {
      type: 'pie',
      data: data
    };
    
    this.chart = new Chart(this.pieCanvas.nativeElement, config);
  }
}
