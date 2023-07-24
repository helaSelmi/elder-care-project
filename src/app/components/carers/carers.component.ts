import { ReservationService } from './../../services/reservation.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carers',
  templateUrl: './carers.component.html',
  styleUrls: ['./carers.component.css']
})
export class CarersComponent implements OnInit {
  pageOfItems: Array<any>;
  carers: any = []
  connectedUser: any;
  constructor(private userService: UserService, private router: Router, private reservationService: ReservationService) { }

  ngOnInit() {
    this.userService.getConfirmedCarers().subscribe((data) => {
      this.carers = data.carers;
    })
  }
  displayAllInfo(id: any) {
    this.router.navigate([`profilCarer/${id}`]);
  }
  reserve(id) {
    Swal.fire({
      title: 'The carer will be informed',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    this.connectedUser = localStorage.getItem("connectedUser");
    let obj = { idCarer: id, idClient: this.connectedUser, status: "waiting" };
    this.reservationService.reseve(obj).subscribe((data) => { console.log(data) });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
