import { ValidationUserService } from './../../services/validation-user.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-modifier',
  templateUrl: './validation-modifier.component.html',
  styleUrls: ['./validation-modifier.component.css']
})
export class ValidationModifierComponent implements OnInit {
  userForm: FormGroup;
  id: any
  user: {}
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private validationUserService: ValidationUserService, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.validationUserService.getUserById(this.id).subscribe((data) => {
      this.user = data.user;
    });

  }
  modifier() {
    this.validationUserService.modifier(this.user).subscribe((response) => {
      this.router.navigate(['Validationusers']);
    });
  }
}
