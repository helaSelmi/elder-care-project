import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { MustMatch } from 'src/app/validators/mustMatch';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupCarerForm: FormGroup;
  imagePreview: any;
  cvPreview: any;
  msg: any;

  constructor(private formbuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signupCarerForm = this.formbuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      telephone: ["", [Validators.required, Validators.pattern(/^[0-9]{8,8}$/)]],
      adress: ["", [Validators.required]],
      experience: ["", [Validators.required, Validators.min(0), Validators.max(25)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      confirmPassword: [""],
      avatar: [""],
      cv: [""],

    }, { validators: MustMatch("password", "confirmPassword") })

  }
  signup() {
    this.signupCarerForm.value.role = "Carer";
    this.signupCarerForm.value.status = "Not confirmed"
    this.userService.signupCarer(this.signupCarerForm.value,
      this.signupCarerForm.value.avatar,
      this.signupCarerForm.value.cv).subscribe((response) => {
        if (response.message == "0") {
          this.msg = "Please check your informations"
        } else {
          this.router.navigate([""]);
        }
      })

  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here selected file", file);
    this.signupCarerForm.patchValue({ avatar: file });
    this.signupCarerForm.updateValueAndValidity();
    // 
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
  onCvSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here selected file", file);
    this.signupCarerForm.patchValue({ cv: file });
    this.signupCarerForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.cvPreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
