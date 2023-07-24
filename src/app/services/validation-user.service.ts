import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationUserService {
  url: string = "http://localhost:3002/validation/users"
  constructor(private http: HttpClient) { }
  signup(obj: any) {
    return this.http.post<{ message: string }>(`${this.url}/inscrit`, obj);
  }
  login(obj: any) {
    console.log("here obj ", obj);
    return this.http.post<{ message: any }>(`${this.url}/login`, obj);
  }
  gelAllUsers() {
    return this.http.get<{ users: any }>(`${this.url}/get`);
  }
  getUserById(id: any) {
    return this.http.get<{ user: any }>(`${this.url}/getById/${id}`);
  }
  modifier(obj: any) {
    return this.http.put(`${this.url}/modifier`, obj)
  }
}
