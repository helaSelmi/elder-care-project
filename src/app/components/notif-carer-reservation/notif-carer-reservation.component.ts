import { ReservationService } from './../../services/reservation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notif-carer-reservation',
  templateUrl: './notif-carer-reservation.component.html',
  styleUrls: ['./notif-carer-reservation.component.css']
})
export class NotifCarerReservationComponent implements OnInit {
  connectedUserId: any;
  reservations: any = [];
  newReservaions: any;
  status = "Taken";
  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.connectedUserId = localStorage.getItem("connectedUser");
    this.reservationService.reservationCarer(this.connectedUserId).subscribe((data) => {
      this.reservations = data.reservation;
    })
  }
  accept(obj: any) {
    obj.status = "Taken";
    this.reservationService.acceptResrvation(obj).subscribe();
  }
  refuse(obj: any) {
    obj.status = "Refuse";
    this.reservationService.refuseReservation(obj).subscribe((response) => {
    });
  }
}
