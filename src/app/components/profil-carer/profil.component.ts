import { UserService } from './../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  carer: any = {};
  id: any;
  constructor(private activatedRouter: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRouter.snapshot.paramMap.get("id");
    this.userService.getCarerById(this.id).subscribe((data) => {
      console.log("Here data", data.carer);
      this.carer = data.carer;
    });
  }
  goToCarers() {
    this.router.navigate(["confirmedCarers"]);
  }

}
