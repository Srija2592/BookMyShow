import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from './seat/BookingDto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  book(book:Booking,transactionId:string){
    return this.http.post('http://localhost:8080/api/booking/book/'+transactionId,book);
  }

  allbookings(username:string){
    return this.http.get('http://localhost:8080/api/booking/bookings/'+username);
  }

  booking(id:number){
    return this.http.get('http://localhost:8080/api/booking/'+id);
  }
  createTransaction(amount:number){
    return this.http.get('http://localhost:8080/api/booking/createTransaction/'+amount);
  }

}
