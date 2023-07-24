import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  signupAdminForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signupAdminForm = this.formBuilder.group({
      telephone: ["", [Validators.required, Validators.pattern(/^[0-9]{8,8}$/)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: [""]
    },
      { validators: MustMatch("password", "confirmPassword") })
  }
  signup() {
    this.signupAdminForm.value.role = "admin";
    this.signupAdminForm.value.status = "Not confirmed"
    console.log(this.signupAdminForm.value);
    
    this.userService.signupAdmin(this.signupAdminForm.value).subscribe((response) => {
      console.log("Here response", response);

    })
    this.router.navigate([""]);
  }
}
