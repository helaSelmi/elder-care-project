import { UserService } from './../../services/user.service';
import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notif-reservation-client',
  templateUrl: './notif-reservation-client.component.html',
  styleUrls: ['./notif-reservation-client.component.css']
})
export class NotifReservationClientComponent implements OnInit {
  connectedUser: any;
  reservations: any = [];
  constructor(private reservationService: ReservationService, private userService: UserService) { }

  ngOnInit() {
    this.connectedUser = localStorage.getItem("connectedUser");
    this.reservationService.reservationClient(this.connectedUser).subscribe((data) => {
      this.reservations = data.reservation;
    });
  }

}
