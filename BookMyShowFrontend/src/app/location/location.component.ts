import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit{

  locations:any;

  movielist:any;

  constructor(private locationService:LocationService,private router:Router){}

  ngOnInit(): void {
    this.locationService.getlocations().subscribe((data)=>{this.locations=data,
      console.log(this.locations)}
    )

  }

  openmovies(location:any){
    this.movielist=location.movieList;
    console.log(this.movielist);
    this.router.navigateByUrl('/movie/'+location.locationName);
    console.log(location.locationName)
  }

}
