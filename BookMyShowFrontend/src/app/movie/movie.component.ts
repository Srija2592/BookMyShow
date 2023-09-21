import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit{

  location:string;

  movies:any;

  filteredMovies:any=[];
  constructor(private movieService:MovieService,private act:ActivatedRoute,private router:Router) {
    this.location=this.act.snapshot.params['location'];
    this.filteredMovies=movieService.allmoviesbylocation(this.location);

  }

  display:boolean=false;
  ngOnInit(): void {
    this.getmoviesbylocation();

  }

  getmoviesbylocation(){
    this.movieService.allmoviesbylocation(this.location).subscribe((data)=>{this.movies=data,console.log(data);
      if(this.movies.length==0){
        this.display=false;
      }
      else{
        this.display=true;
      }})
  }

  opentheatres(movie:any){
    this.router.navigateByUrl('/theatre/'+this.location+'/'+movie);
  }

  searchFound:boolean=false;
  filterResults(text:string){
    if (!text) {
      this.filteredMovies = this.movies;
    }

    this.filteredMovies = this.movies.filter(
      (loc:any) => loc?.movieName.toLowerCase().includes(text.toLowerCase())
    );
    if(this.filteredMovies.length!=0){
      this.searchFound=true;
    }
    text="";
    }
}
