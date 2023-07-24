import { Router } from '@angular/router';
import { PublicationService } from './../../services/publication.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publication: any = [];
  msg: string;
  case = "taken";
  pageOfItems: Array<any>;
  constructor(private publicationService: PublicationService, private router: Router) { }

  ngOnInit() {
    this.publicationService.dispalyAllPublications().subscribe((data) => {
      console.log("Here data", data);
      this.publication = data.publication;
    });
  }
  gotoClientInfos(id: any) {
    this.router.navigate([`clientInfo/${id}`]);
  }
  accept(obj: any) {
    obj.case = "taken";
    let connectedUser = localStorage.getItem("connectedUser");
    obj.carerId = connectedUser;
    this.publicationService.editPublication(obj).subscribe((response) => {
      if (response.message == "1") {
        this.msg = "the customer will be informed";
      } else {
        this.msg = "Error";
      }
    });
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
