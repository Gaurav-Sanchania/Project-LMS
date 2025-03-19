import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { EmailComponent } from "./email/email.component";
import { CommomnService } from '../services/commonService.service';

@Component({
  selector: 'app-leave-request',
  imports: [NavbarComponent, EmailComponent],
  providers: [CommomnService],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent {
  constructor(private commonService: CommomnService) {
  }
}
