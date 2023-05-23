import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDto } from './movie/MovieDto';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http:HttpClient) { }

  addmovie(movie:MovieDto){
    return this.http.post('http://localhost:8080/api/movie/addmovie',movie);
  }

  allmoviesbylocation(location:string){
    return this.http.get('http://localhost:8080/api/movie/moviebyname/'+location)
  }
}
