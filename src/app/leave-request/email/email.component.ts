import {ChangeDetectionStrategy, Component } from '@angular/core';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommomnService } from '../../services/commonService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/loginService.service';

@Component({
  selector: 'app-email',
  imports: [FroalaEditorModule, FroalaViewModule, CommonModule,
    MatSliderModule, MatButtonModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter(), CommomnService, LoginService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent {
  confirmationForm!: FormGroup;
  isSubmitted = false;
  submittedData: any;
  public leaveTypes: any = {};
  leaveData: any = [];
  steps = Array.from({ length: 11 }, (_, i) => i);

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private commonService: CommomnService,
    private loginService: LoginService
  ) {
    this.confirmationForm = this.fb.group({});
  }
  
  async ngOnInit() {
    this.leaveTypes = await this.commonService.getLeaveTypes();
    const params: any = this.route.snapshot.paramMap;
    // console.log(params);
    if (params.keys.length === 0) {
      // console.log("No parameters found");
    } else {
      this.leaveData = {
        startDate: params.get('startDate'),
        endDate: params.get('endDate'),
        reason: params.get('reason'),
        user_Name: params.get('user_Name'),
        user_Department: params.get('user_Department'),
        totalDays: +params.get('totalDays')!,
        admin_Name: params.get('admin_Name'),
        createdAt: params.get('createdAt'),
        updatedAt: params.get('updatedAt'),
        createdBy: params.get('createdBy'),
        updatedBy: params.get('updatedBy'),
        status: params.get('status'),
        leave_Type: +params.get('leave_Type')!,
        cc: params.get('cc'),
        bcc: params.get('bcc'),
      };
    }
    this.initForm();
  }
  

  private initForm() {
      this.confirmationForm = this.fb.group({
        to: ['', [Validators.required,  Validators.email]],
        cc: ['', [Validators.email]],
        bcc: ['', [Validators.email]],
        subject: [ 'Subject: ', [Validators.required]],
        numberOfDays: [1, [Validators.required, Validators.max(10)]],
        leaves: ['', Validators.required],
        datePicker: [ new Date, Validators.required],
        froalaEditor: [ "Write your content here..", Validators.required],
      });
  }

  onSubmit() {
    if (this.confirmationForm.valid) {
      this.isSubmitted = true;
      this.submittedData = this.confirmationForm.value;
      // console.log(this.submittedData);

      const leaveRequest = {
        startDate: this.convertDate(this.confirmationForm.value.datePicker),
        endDate: this.calculateEndDate(this.confirmationForm.value.datePicker, this.confirmationForm.value.numberOfDays),
        reason: this.confirmationForm.value.froalaEditor,
        userId: this.loginService.getUserId(),
        adminEmail: this.confirmationForm.value.to,
        leaveType: Number(this.confirmationForm.value.leaves)
      };
      console.log(leaveRequest);

      const status = this.commonService.requestsLeave(leaveRequest);
      // console.log(status);
      this.redirectBackToForm();
    }
  }

  draftMail() {
    if (this.confirmationForm.valid ) {
      this.submittedData = true;
      this.submittedData = this.confirmationForm.value;

      const status = this.commonService.draftLeaveRequest(this.submittedData);
    }
  }

  get f() {
    return this.confirmationForm.controls;
  }

  redirectBackToForm() {
    this.confirmationForm.reset();
    this.isSubmitted = false;
    this.ngOnInit();
  }

  formatLabel(value: number): string {
    return `${value}`;
  }

  calculateEndDate(startDate: string | Date, days: number): string {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }
  
  convertDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
