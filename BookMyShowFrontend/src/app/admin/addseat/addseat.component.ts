import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { LocationService } from 'src/app/location.service';
import { MovieService } from 'src/app/movie.service';
import { SeatService } from 'src/app/seat.service';
import { Seat } from 'src/app/seat/SeatDto';
import { TheatreService } from 'src/app/theatre.service';

@Component({
  selector: 'app-addseat',
  templateUrl: './addseat.component.html',
  styleUrls: ['./addseat.component.css']
})
export class AddseatComponent implements OnInit{
  seatDto!:Seat;
  seatForm!:FormGroup;
  locations2:any;
  movies1:any;
  theatres:any;
  seatadded:boolean=false;
  noofseats:number=0;
  constructor(private seatService:SeatService,private theatreService:TheatreService,private movieService:MovieService,private locationService:LocationService){
    this.seatDto={
      locationName:'',
      movieName:'',
      theatreName:''
    }
  }
  ngOnInit(): void {
    this.locationService.getlocations().subscribe((data)=>{this.locations2=data});
    this.seatForm=new FormGroup({
      location:new FormControl('',Validators.required),
      movie:new FormControl('',Validators.required),
      theatre:new FormControl('',Validators.required),
      noofseats:new FormControl('',Validators.required)
    })
  }

  onSelectMovie(e:any){
    var theatre=e.target.value;
    this.seatDto.movieName=theatre;
    this.theatreService.theatresbymoviename(this.seatDto.movieName,this.seatDto.locationName).subscribe((data)=>{this.theatres=data,
      console.log(this.theatres)});

  }
  onSelectlocation(e:any){
    var loc=e.target.value;
    this.seatDto.locationName=loc;
    this.movieService.allmoviesbylocation(this.seatDto.locationName).subscribe((data)=>{this.movies1=data,console.log(this.movies1)});
  }
  onSelectTheatre(e:any){
    var theatre=e.target.value;
    this.seatDto.theatreName=theatre;
    console.log(this.seatDto.theatreName);

  }

  addSeats(){
    this.noofseats=this.seatForm.get('noofseats')?.value;
    for(let i=0;i<this.noofseats;i++){
      this.seatService.addseat(this.seatDto).subscribe((data)=>{console.log("seat added"),this.seatadded=true});}
  }

}
