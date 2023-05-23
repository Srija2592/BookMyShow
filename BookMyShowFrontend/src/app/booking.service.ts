import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

  book(book:any){
    return this.http.post('http://localhost:8080/api/booking/book',book);
  }

  allbookings(username:string){
    return this.http.get('http://localhost:8080/api/booking/bookings/'+username);
  }

  booking(id:number){
    return this.http.get('http://localhost:8080/api/booking/'+id);
  }
}
