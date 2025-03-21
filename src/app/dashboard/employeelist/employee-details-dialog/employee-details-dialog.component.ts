import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details-dialog',
  imports: [MatDialogModule],
  templateUrl: './employee-details-dialog.component.html',
  styleUrl: './employee-details-dialog.component.scss',
})
export class EmployeeDetailsDialogComponent {
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public injectedData: any) {
    this.data = injectedData;
  }
}
