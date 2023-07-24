import { PublicationService } from './../../services/publication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publications-table',
  templateUrl: './publications-table.component.html',
  styleUrls: ['./publications-table.component.css']
})
export class PublicationsTableComponent implements OnInit {
  publications: any;
  constructor(private publicationService: PublicationService) { }

  ngOnInit() {
    this.getAllPublications();
  }
  getAllPublications() {
    this.publicationService.getAllPublications().subscribe((data) => {
      this.publications = data.publications;
    })
  }
  confirmStatus(id: any) {
    console.log("here id", id);
    this.publicationService.confirmPublicationStatus(id).subscribe((response) => {
      console.log("here response", response);
      this.getAllPublications();
    })
  }
  delete(id: any) {
    this.publicationService.deletePublication(id).subscribe((response) => {
      console.log("here response", response);
      this.getAllPublications();
    });
  }
}
