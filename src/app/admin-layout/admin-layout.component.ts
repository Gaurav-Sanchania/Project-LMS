import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [NavbarComponent, AdminDashboardComponent, RouterOutlet],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
