import { Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminService } from '../services/adminService.service';
import { CommonModule } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';
import { ConfirmDialogComponent } from '../dashboard/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-allusers',
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatDividerModule, MatButtonModule],
  providers: [AdminService],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.scss'
})
export class AllusersComponent {
  public userList: any = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['name', 'department', 'email', 'address', 'phone', 'userType', 'action'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  hoveredRow: any = null;

  constructor(private adminService: AdminService, private router: Router, private dialog: MatDialog) { }

  async ngOnInit() {
    this.userList = await this.adminService.getAllUsers();
    this.dataSource = new MatTableDataSource(this.userList);
    // console.log(this.userList);

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editUser(user: any) {
    // console.log("Edit user");
    this.dialog.open(AdduserComponent, {
      width: "700px",
      data: user
    });
  }
  deleteUser(user: any) {
    // console.log("Delete user");
    this.dialog.open(ConfirmDialogComponent, {
    })
  }

  addUserForm() {
    this.dialog.open(AdduserComponent, {
      width: "700px"
    });
  }
  refresh() {
    window.location.reload();
    // this.router.navigate([this.router.url]);    
  }
}
