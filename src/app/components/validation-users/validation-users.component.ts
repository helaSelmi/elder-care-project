import { Router } from '@angular/router';
import { ValidationUserService } from './../../services/validation-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-users',
  templateUrl: './validation-users.component.html',
  styleUrls: ['./validation-users.component.css']
})
export class ValidationUsersComponent implements OnInit {
  users: any;
  number: any;

  constructor(private validationUserService: ValidationUserService, private router: Router) { }

  ngOnInit() {
    this.validationUserService.gelAllUsers().subscribe((data) => {
      this.users = data.users;
      this.number = this.users.length;
    })
  }
  goTomodifier(id: any) {
    this.router.navigate([`modifierUser/${id}`])
  }
}
