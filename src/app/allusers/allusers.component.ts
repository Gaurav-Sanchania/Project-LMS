import { Component, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AdminService } from '../services/adminService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allusers',
  imports: [CommonModule, MatTableModule, MatSortModule],
  providers: [AdminService],
  templateUrl: './allusers.component.html',
  styleUrl: './allusers.component.scss'
})
export class AllusersComponent {
  public userList: any = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['name', 'department', 'email', 'address', 'phone', 'userType', 'action'];
  @ViewChild(MatSort) sort!: MatSort; 

  constructor(private adminService: AdminService) {}
  
    async ngOnInit() {
      this.userList = await this.adminService.getAllUsers();
      this.dataSource = new MatTableDataSource(this.userList);
      // console.log(this.userList);
    }

    ngAfterViewChecked() {
      this.dataSource.sort = this.sort;
    }
    editUser(user: any) {
      console.log("Edit user");
    }
    deleteUser(user: any) {
      console.log("Delete user");
    }
}
