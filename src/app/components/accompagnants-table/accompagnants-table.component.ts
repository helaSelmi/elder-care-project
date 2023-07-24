import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accompagnants-table',
  templateUrl: './accompagnants-table.component.html',
  styleUrls: ['./accompagnants-table.component.css']
})
export class AccompagnantsTableComponent implements OnInit {
  accomapagnants: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getAllAccompagnants();
  }
  delete(id: any) {
    this.userService.deleteAccompagnant(id).subscribe((response) => {
      this.getAllAccompagnants();
    });
  }
  confirm(id: any) {
    this.userService.confirmeStatusAccompagnant(id).subscribe((response) => {
      this.getAllAccompagnants();
    })
  }
  getAllAccompagnants() {
    this.userService.getAllAccompagnants().subscribe((data) => {
      this.accomapagnants = data.accomapagnants
      console.log("here data", data.accomapagnants);
    });
  }
  display(id: any) {
    this.router.navigate([`profilCarer/${id}`]);
  }
}
