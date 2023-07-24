import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carers-carousel',
  templateUrl: './carers-carousel.component.html',
  styleUrls: ['./carers-carousel.component.css']
})
export class CarersCarouselComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  carers: any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getConfirmedCarers().subscribe((data) => {
      this.carers = data.carers;
    })
  }

}
