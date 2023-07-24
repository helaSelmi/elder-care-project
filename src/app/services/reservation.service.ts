import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  resUrl: string = "http://localhost:3002/reservation"
  constructor(private http: HttpClient) { }
  reseve(obj: any) {
    return this.http.post<{ message: any }>(`${this.resUrl}/carer`, obj);
  };
  reservationClient(id: any) {
    return this.http.get<{ reservation: any }>(`${this.resUrl}/client/${id}`);
  }
  reservationCarer(id: any) {
    return this.http.get<{ reservation: any }>(`${this.resUrl}/carer/${id}`);
  }
  acceptResrvation(obj: any) {
    return this.http.put<{ isAccept: boolean }>(`${this.resUrl}/accept`, obj);
  }
  refuseReservation(obj: any) {
    return this.http.put<{ isRefuse: boolean }>(`${this.resUrl}/carer/refuse`, obj)
  }
}
