import { Component } from '@angular/core';
import { LoginService } from '../services/loginService.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.email,
      Validators.maxLength(50)
    ]),
    password: new FormControl("")
  });

  async onSubmit() {
    if (this.loginForm.invalid) {
      console.log("Form is invalid! Fix the errors before submitting.");
      return; 
    }

    try {
      const loginValid = await this.loginService.loginValidation(this.loginForm.value);
  
      if(loginValid) {
        if(loginValid == 'Employee') {
          this.router.navigate(["dashboard"])
        } else {
          this.router.navigate(["admin/dashboard"]);
        }        
      } else {
        this.router.navigate(["login"]);
        alert("Invalid User")
      }
    } catch (error) {
      console.log(error);
    }
  }
}
