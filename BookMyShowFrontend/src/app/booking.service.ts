import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from './seat/BookingDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/api/booking'; // Adjust as needed

  constructor(private http: HttpClient) {}

  // Changed: Removed book method (handled in confirmBooking)
  allbookings(username: string) {
    return this.http.get(`${this.apiUrl}/bookings/${username}`);
  }

  booking(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Removed: createTransaction (now part of initiateBooking)

  // New: Initiate booking and payment
  initiateBooking(booking: Booking): Observable<any> {
    return this.http.post(`${this.apiUrl}/initiate`, booking);
  }

  // New: Confirm booking after payment
  confirmBooking(paymentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm`, null, { params: { paymentId } });
  }
}
