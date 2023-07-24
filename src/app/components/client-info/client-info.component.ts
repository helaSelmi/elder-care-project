import { PublicationService } from './../../services/publication.service';
import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  client: any;
  id: any;
  publication: any;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.userService.getClientById(this.id).subscribe((data) => {
      this.client = data.client;
    })
  }
}
