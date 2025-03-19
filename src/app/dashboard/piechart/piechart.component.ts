import { Component, ElementRef, ViewChild } from '@angular/core';
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
  constructor(private commonService: CommomnService) {
  }

  private countOnPresent: any;
  private countOnLeave: any;
  async ngOnInit() {
    this.countOnPresent = await this.commonService.getCountOnPresent();
    this.countOnLeave = await this.commonService.getCountOnLeave();
    this.createPieChart();
    // console.log(this.countOnPresent);
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
    
    new Chart(this.pieCanvas.nativeElement, config);
  }
}
