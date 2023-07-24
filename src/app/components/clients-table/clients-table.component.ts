import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit {
  clients: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllClients();
  }
  getAllClients() {
    this.userService.getAllClients().subscribe((data) => {
      this.clients = data.clients;
    });
  }
  delete(id: any) {
    this.userService.delete(id).subscribe((response) => {
      console.log("here response", response);
      this.getAllClients();
    });
  }
  confirmStatus(id: any) {
    this.userService.confirmeStatus(id).subscribe((response) => {
      console.log("here response", response);
      this.getAllClients();
    });
  }
}
