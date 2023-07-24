import { Router } from '@angular/router';
import { PublicationService } from './../../services/publication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent implements OnInit {
  addPublicationForm: FormGroup;
  constructor(private publicationService: PublicationService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.addPublicationForm = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]]
    })
  }
  addPublication() {
    this.addPublicationForm.value.userId = localStorage.getItem("connectedUser");
    this.addPublicationForm.value.status = "Not confirmed";
    this.addPublicationForm.value.case = "waiting";
    this.publicationService.addPublication(this.addPublicationForm.value).subscribe((response) => {
      console.log("Here response", response);

    });
    this.router.navigate(["confirmedCarers"]);
  }

}
