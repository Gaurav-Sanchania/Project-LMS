import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { AdduserComponent } from "../adduser/adduser.component";
import { AllusersComponent } from "../allusers/allusers.component";

@Component({
  selector: 'app-admin-layout2',
  imports: [NavbarComponent, AdduserComponent, AllusersComponent],
  templateUrl: './admin-layout2.component.html',
  styleUrl: './admin-layout2.component.scss'
})
export class AdminLayout2Component {

}
