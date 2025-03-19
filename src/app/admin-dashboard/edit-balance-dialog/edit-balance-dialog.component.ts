import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminService } from '../../services/adminService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-balance-dialog',
  imports: [CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatButtonModule,],
    providers: [AdminService],
  templateUrl: './edit-balance-dialog.component.html',
  styleUrl: './edit-balance-dialog.component.scss'
})
export class EditBalanceDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService, private router: Router) {}

  approveLeave(id: number) {
    // console.log('Approve Leave');
    console.log(this.adminService.approveLeave(id));
    // console.log(id);
    window.location.reload();
  }
}
