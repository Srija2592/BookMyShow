import { Component,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/location.service';
import { MovieService } from 'src/app/movie.service';
import { MovieDto } from 'src/app/movie/MovieDto';
import { TheatreService } from 'src/app/theatre.service';
import {Theatre} from 'src/app/theatre/TheatreDto';

@Component({
  selector: 'app-addtheatre',
  templateUrl: './addtheatre.component.html',
  styleUrls: ['./addtheatre.component.css']
})
export class AddtheatreComponent implements OnInit{
  addedtheatre:boolean=false;
  selectedLocation:any;
  movies:any;
  locations1:any;
  movieDto!:MovieDto;
  theatreDto!:Theatre;
  theatreForm!:FormGroup;
  constructor(private router:Router,private locationService:LocationService,private movieService:MovieService,private theatreService:TheatreService){
    this.theatreDto={
      locationName:'',
      movieName:'',
      theatreName:'',
      price:0
    }
  }
  ngOnInit(): void {
    this.locationService.getlocations().subscribe((data)=>{this.locations1=data,console.log(this.locations1)});
    this.theatreForm=new FormGroup(
      {
        movie:new FormControl('',Validators.required),
        location:new FormControl('',Validators.required),
        theatre:new FormControl('',Validators.required),
        price:new FormControl('',Validators.required)
      }
    )
  }


  onSelectMovie(e:any){
    var theatre=e.target.value;
    this.theatreDto.movieName=theatre;
    console.log(this.theatreDto.movieName);
  }
  onSelectlocation(e:any){
    var loc=e.target.value;
    this.theatreDto.locationName=loc;
    console.log(this.theatreDto.locationName);
    this.movieService.allmoviesbylocation(this.theatreDto.locationName).subscribe((data)=>{this.movies=data,console.log(this.movies)});
    this.selectedLocation=loc;


  }

  addTheatre(){
    this.theatreDto.theatreName=this.theatreForm.get('theatre')?.value;
    this.theatreDto.price=this.theatreForm.get('price')?.value;
    console.log(this.theatreDto);
    this.theatreService.addtheatre(this.theatreDto).subscribe((data)=>{console.log("theatre added");
    this.addedtheatre=true;})
  }
}
