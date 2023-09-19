import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  addlocation(location:string):any{
    return this.http.post('http://localhost:8080/api/location/addlocation/'+location,location);
  }

  getlocations(){
    return this.http.get('http://localhost:8080/api/location/locations');
  }
}
