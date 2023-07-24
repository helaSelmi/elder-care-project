import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent implements OnInit {
  signupClientForm: FormGroup;
  imagePreview: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.signupClientForm = this.formBuilder.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      telephone: ["", [Validators.required, Validators.pattern(/^[0-9]{8,8}$/)]],
      adress: ["", [Validators.required]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: [""],
      avatar: [""],
    }, { validators: MustMatch("password", "confirmPassword") })

  }
  signup() {
   
    this.signupClientForm.value.role = "client";
    this.signupClientForm.value.status = "Not Confirmed";
    this.userService.signupClient(this.signupClientForm.value,
      this.signupClientForm.value.avatar).subscribe((response) => {
        console.log("Here response", response);

      })
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Here selected file", file);
    this.signupClientForm.patchValue({ avatar: file });
    this.signupClientForm.updateValueAndValidity();
    // 
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }
}
