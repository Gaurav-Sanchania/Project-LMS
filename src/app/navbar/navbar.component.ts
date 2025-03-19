import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from '../services/loginService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  providers: [LoginService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private loginService: LoginService) {
  }
  
  empOrNot(): boolean {
    const userType = this.loginService.getUserType();
    // console.log(userType);
    
    if(userType) {
      if(userType == 'Employee') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
