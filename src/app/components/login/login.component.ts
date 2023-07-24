import { UserService } from './../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.email]],
      telephone: ["", [Validators.pattern(/^[0-9]{8,8}$/)]],
      password: ["", [Validators.required]]
    })
  }
  Login() {
    this.userService.login(this.loginForm.value).subscribe((response) => {
      if (response.message != "2") {
        // Error msg
        this.errorMsg = "Please check your informations";
      } else {
        localStorage.setItem("connectedUser", response.user.id);
        localStorage.setItem("role", response.user.role);
        if (response.user.role == "Carer") {
          this.router.navigate(["publications"]);
        } else if (response.user.role == "client") {
          this.router.navigate(["confirmedCarers"]);
        } else {
          this.router.navigate(["admin"]);
        }

      }
    });
  }
}
