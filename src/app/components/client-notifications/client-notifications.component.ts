import { Router } from '@angular/router';
import { PublicationService } from './../../services/publication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-notifications',
  templateUrl: './client-notifications.component.html',
  styleUrls: ['./client-notifications.component.css']
})
export class ClientNotificationsComponent implements OnInit {
  connectedUserId: any;
  clientPubs: any = [];
  case = "taken";
  constructor(private publicationService: PublicationService, private router: Router) { }

  ngOnInit() {
    this.connectedUserId = localStorage.getItem("connectedUser");
    this.publicationService.getClientPublications(this.connectedUserId).subscribe((data) => {
      this.clientPubs = data.clientPublications;
    });
  }
  goToCarerInfos(id: any) {
    this.router.navigate([`profilCarer/${id}`]);
  }
}
