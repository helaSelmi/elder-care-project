import { Router } from '@angular/router';
import { ValidationUserService } from './../../services/validation-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-login',
  templateUrl: './validation-login.component.html',
  styleUrls: ['./validation-login.component.css']
})
export class ValidationLoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;
  constructor(private formBuilder: FormBuilder, private validationUserService: ValidationUserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      telephone: ["", [Validators.required, Validators.pattern(/^[0-9]{8,8}$/)]],
      password: ["", [Validators.required]]
    })
  }
  Login() {
    this.validationUserService.login(this.loginForm.value).subscribe((response) => {
      console.log("here response after login", response);

      if (response.message != "2") {
        console.log("here response", response.message);

        this.errorMsg = "Please check your informations";
      }
      else {
        this.router.navigate(["Validationusers"]);
      }
    })
  }
}
