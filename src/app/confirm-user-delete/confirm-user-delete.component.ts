import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from '../services/adminService.service';
import { UserService } from '../services/userService.service';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-confirm-user-delete',
  imports: [
      MatFormFieldModule,
      MatDialogActions,
      MatDialogClose,
      MatDialogContent,
      MatDialogTitle],
  templateUrl: './confirm-user-delete.component.html',
  styleUrl: './confirm-user-delete.component.scss'
})
export class ConfirmUserDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService, private router: Router) {
  }
  
  onDeleteUser(id: number) {
    // console.log(id);
    this.adminService.deteleUserById(id);
    window.location.reload();
  }
}
