import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/adminService.service';
import { LoginService } from '../services/loginService.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-adduser',
  imports: [CommonModule, ReactiveFormsModule, MatTableModule, MatSortModule],
  providers: [AdminService],
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.scss',
})
export class AdduserComponent {
  confirmationForm!: FormGroup;
  isSubmitted = false;
  submittedData: any;
  // genders = ['Male', 'Female', 'Other'];
  public departments: any = [];
  public userTypes: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) {}

  async ngOnInit() {
    this.initForm();
    this.departments = await this.adminService.getDepartmentTypes();
    this.userTypes = await this.adminService.getUserTypes();
    // console.log(this.userList);
  }

  private initForm() {
    this.confirmationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      department: ['', Validators.required],
      userType: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.confirmationForm.valid) {
      this.isSubmitted = true;
      this.submittedData = this.confirmationForm.value;
      // console.log(this.submittedData);

      const status = this.adminService.addUser(this.submittedData);
      // console.log(status);
    }
  }

  get f() {
    return this.confirmationForm.controls;
  }

  redirectBackToForm() {
    this.router.navigate(['admin/addUser']).then(() => {
      this.confirmationForm.reset();
    });
    this.isSubmitted = false;
  }
}
