import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profil-client',
  templateUrl: './edit-profil-client.component.html',
  styleUrls: ['./edit-profil-client.component.css']
})
export class EditProfilClientComponent implements OnInit {
  id: any;
  user = {};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.id = localStorage.getItem("connectedUser");
    this.userService.getClientById(this.id).subscribe((data) => {
      this.user = data.client;
    })
  }
  modifierProfil() {
    this.userService.editClientProfil(this.user).subscribe((response) => {
      this.router.navigate([`clientInfo/${this.id}`]);
    });
  }

}
