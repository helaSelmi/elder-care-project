import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  connectedUser: any;
  role: any;
  status:any;;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.connectedUser = localStorage.getItem("connectedUser");
    this.userService.getUserById(this.connectedUser).subscribe((data) => {
      this.role = data.user.role;
      this.status=data.user.status; 
      console.log("this role", this.role);

    })
  }
  logout() {
    localStorage.removeItem("connectedUser")
    this.router.navigate([""]);
  }
}
