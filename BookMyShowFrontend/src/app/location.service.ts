import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  addlocation(location:string):any{
    return this.http.post('http://localhost:8080/api/location/addlocation/'+location,location);
  }

  getlocations():Observable<any>{
    return this.http.get<any>('http://localhost:8080/api/location/locations');
  }
}
