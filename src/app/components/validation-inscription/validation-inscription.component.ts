import { ValidationUserService } from './../../services/validation-user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-inscription',
  templateUrl: './validation-inscription.component.html',
  styleUrls: ['./validation-inscription.component.css']
})
export class ValidationInscriptionComponent implements OnInit {
  signupForm: FormGroup;
  msg: string;
  constructor(private formBuilder: FormBuilder, private validationUserService: ValidationUserService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      telephone: ["", [Validators.required, Validators.pattern(/^[0-9]{8,8}$/)]],
      password: ["", [Validators.required, Validators.min(10), Validators.max(14)]],
      firstName: ["", [Validators.required, Validators.min(3)]],
      lastName: ["", [Validators.required, Validators.min(5)]]
    })

  }
  signup() {
    this.validationUserService.signup(this.signupForm.value).subscribe((response) => {
      this.msg = response.message;
      console.log("here response", response);

    })
  }

}
