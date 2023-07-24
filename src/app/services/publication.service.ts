import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  publicationUrl: string = "http://localhost:3002/publications"
  constructor(private httpClient: HttpClient) { }
  addPublication(obj: any) {
    return this.httpClient.post<{ message: string }>(`${this.publicationUrl}/addPublication`, obj);
  }
  getAllPublications() {
    return this.httpClient.get<{ publications: any }>(`${this.publicationUrl}/getAllPublications`);
  }
  confirmPublicationStatus(id: any) {
    return this.httpClient.get<{ isModified: boolean }>(`${this.publicationUrl}/confirmePublicationStatus/${id}`);
  }
  deletePublication(id: any) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.publicationUrl}/delete/${id}`);
  }
  dispalyAllPublications() {
    return this.httpClient.get<{ publication: any }>(`${this.publicationUrl}/getConfirmedPublications`);
  }
  getPublicationById(id: any) {
    return this.httpClient.get<{ publication: any }>(`${this.publicationUrl}/getPublicationById`);
  }
  editPublication(obj: any) {
    return this.httpClient.put<{ message: string }>(`${this.publicationUrl}`, obj);
  }
  getClientPublications(id: any) {
    return this.httpClient.get<{ clientPublications: any }>(`${this.publicationUrl}/getClientPublications/${id}`);
  }
}
