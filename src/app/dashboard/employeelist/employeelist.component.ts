import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommomnService } from '../../services/commonService.service';

@Component({
  selector: 'app-employeelist',
  imports: [CommonModule],
  providers: [CommomnService],
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent {
  EmployeeList: any = [];
  constructor(private commonService: CommomnService) {
  }

  async ngOnInit() {
    this.EmployeeList = await this.commonService.getEmployeeOnLeave();
    console.log(this.EmployeeList);
  }
}
