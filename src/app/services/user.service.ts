import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { log } from 'util';
// import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  userUrl: string = "http://localhost:3002/users"
  constructor(private httpClient: HttpClient) { }
  signupCarer(obj: any, avatar: File, cv: File) {
    let formData = new FormData();
    formData.append("firstName", obj.firstName);
    formData.append("lastName", obj.lastName);
    formData.append("telephone", obj.telephone);
    formData.append("adress", obj.adress);
    formData.append("experience", obj.experience);
    formData.append("email", obj.email);
    formData.append("password", obj.password);
    formData.append("role", obj.role);
    formData.append("status", obj.status);
    formData.append("avatar", avatar);
    formData.append("cv", cv);
    
    return this.httpClient.post<{ message: string }>(`${this.userUrl}/signupCarer`, formData)
  }

  signupAdmin(obj: any) {
 
    
    return this.httpClient.post<{ message: string }>(`${this.userUrl}/signupAdmin`, obj)
  }
  signupClient(obj: any, avatar: File) {
    let formData = new FormData();
  
    formData.append("firstName", obj.firstName);
    formData.append("lastName", obj.lastName);
    formData.append("telephone", obj.telephone);
    formData.append("adress", obj.adress);
    formData.append("email", obj.email);
    formData.append("password", obj.password);
    formData.append("role", obj.role);
    formData.append("status", obj.status);
    formData.append("avatar", avatar);
    console.log(formData);
    
    return this.httpClient.post<{ message: string }>(`${this.userUrl}/signupClient`, formData)
  }
  login(obj: any) {
    return this.httpClient.post<{ message: string, user: any }>(`${this.userUrl}/login`, obj)
  }
  getUserById(id: any) {
    return this.httpClient.get<{ user: any }>(`${this.userUrl}/get/${id}`);
  }
  getAllUsers() {
    return this.httpClient.get<{ users: any }>(`${this.userUrl}/getAll`);
  }
  getAllAccompagnants() {
    return this.httpClient.get<{ accomapagnants: any }>(`${this.userUrl}/accompagnants`)

  }
  getConfirmedCarers() {
    return this.httpClient.get<{ carers: any }>(`${this.userUrl}/confirmedCarers`)
  }
  getAllClients() {
    return this.httpClient.get<{ clients: any }>(`${this.userUrl}/clients`);
  }
  getAllAdmins() {
    return this.httpClient.get<{ admins: any }>(`${this.userUrl}/admins/get`);
  }
  delete(id: any) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.userUrl}/${id}`);
  }
  deleteAccompagnant(id: any) {
    return this.httpClient.delete<{ isDeleted: boolean }>(`${this.userUrl}/accompagnant/${id}`);
  }
  confirmeStatus(id: any) {
    return this.httpClient.get<{ isModified: boolean }>(`${this.userUrl}/confirmeStatus/${id}`);
  }
  confirmeStatusAccompagnant(id: any) {
    return this.httpClient.get<{ isModified: boolean }>(`${this.userUrl}/confirmeStatusAccompagnant/${id}`);
  }
  getCarerById(id: any) {
    return this.httpClient.get<{ carer: any, message: string }>(`${this.userUrl}/carer/${id}`);
  }
  getClientById(id: any) {
    return this.httpClient.get<{ client: any, message: string }>(`${this.userUrl}/client/${id}`);
  }
  editClientProfil(obj: any) {
    return this.httpClient.put(`${this.userUrl}/modifier/client`, obj)
  }
  searchCarer(obj: any) {
    return this.httpClient.post<{ searchCarers: any }>(`${this.userUrl}/search`, obj);
  }


  getChartUsers(){
    return this.httpClient.get<{roleCounts:any}>(`${this.userUrl}/chart`)
    
  }
}
