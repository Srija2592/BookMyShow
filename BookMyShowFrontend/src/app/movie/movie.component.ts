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

  constructor(private movieService:MovieService,private act:ActivatedRoute,private router:Router) {
    this.location=this.act.snapshot.params['location'];

  }

  ngOnInit(): void {
    this.getmoviesbylocation();

  }

  getmoviesbylocation(){
    this.movieService.allmoviesbylocation(this.location).subscribe((data)=>{this.movies=data,console.log(data)})
  }

  opentheatres(movie:any){
    this.router.navigateByUrl('/theatre/'+this.location+'/'+movie);
  }

}
