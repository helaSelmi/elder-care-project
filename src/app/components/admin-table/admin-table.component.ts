import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  admins: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllAdmin();

  }
  getAllAdmin() {
    this.userService.getAllAdmins().subscribe((data) => {
      this.admins = data.admins;
      console.log("here admin", this.admins);

    });
  }
  confirmStatus(id: any) {
    this.userService.confirmeStatus(id).subscribe((response) => {
      console.log("here response", response);
      this.getAllAdmin();
    });
  }
  delete(id: any) {
    this.userService.delete(id).subscribe((response) => {
      console.log("here response", response);
      this.getAllAdmin();
    });
  }
}
