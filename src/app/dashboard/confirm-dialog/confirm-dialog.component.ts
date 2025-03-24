import { Component, Inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AdminService } from '../../services/adminService.service';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatFormFieldModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService, private router: Router, private userService: UserService) {
  }

  onDelete(id: number) {
    // console.log(id);
    this.userService.deleteLeaveById(id);
  }
}
