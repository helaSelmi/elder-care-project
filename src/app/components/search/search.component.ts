import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  carers: any = [];
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      adress: (""),
      intervaleOne: (""),
      intervaleTwo: ("")
    })
  }
  search() {
    this.userService.searchCarer(this.searchForm.value).subscribe((data) => {
      this.carers = data.searchCarers;
    });
  }
  display(id: any) {
    this.router.navigate([`profilCarer/${id}`])
  }
}
