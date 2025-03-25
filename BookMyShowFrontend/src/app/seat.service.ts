import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from './seat/SeatDto';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private http:HttpClient) { }

  addseat(seat:Seat){
    return this.http.post('http://localhost:8080/api/seat/addseat',seat);
  }

  allseats(date:Date,theatreName:string,movieName:string,locationName:string){
    return this.http.get('http://localhost:8080/api/seat/allseats/'+date+'/'+theatreName+'/'+movieName+'/'+locationName);
  }


  updateseat(seat:any){
    return this.http.put('http://localhost:8080/api/seat/updateseat',seat);
  }
}
