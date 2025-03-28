import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, DashboardComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
