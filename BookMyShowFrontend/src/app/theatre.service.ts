import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theatre } from './theatre/TheatreDto';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private http:HttpClient) { }

  addtheatre(theatre:Theatre){
    return this.http.post('http://localhost:8080/api/theatre/addtheatre',theatre);
  }

  theatresbymoviename(movie:string,location:string){
    return this.http.get('http://localhost:8080/api/theatre/theatres/'+movie+'/'+location);
  }
}
