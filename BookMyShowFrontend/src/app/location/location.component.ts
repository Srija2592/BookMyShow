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


  display:boolean=false;
  filteredLocations:any=[];
  constructor(private locationService:LocationService,private router:Router){
    this.filteredLocations=locationService.getlocations();
  }

  ngOnInit(): void {
    this.locationService.getlocations().subscribe((data)=>{this.locations=data,
      console.log(this.locations);
      if(this.locations.length==0){
        this.display=false;
      }
      else{
        this.display=true;
      }}
    )

  }
  searchFound:boolean=false;

  filterResults(text:string){
    if (!text) {
      this.filteredLocations = this.locations;
    }

    this.filteredLocations = this.locations.filter(
      (loc:any) => loc?.locationName.toLowerCase().includes(text.toLowerCase())
    );
    if(this.filteredLocations.length!=0){
      this.searchFound=true;
    }
    }


  openmovies(location:any){
    this.movielist=location.movieList;
    console.log(this.movielist);
    this.router.navigateByUrl('/movie/'+location.locationName);
    console.log(location.locationName)
  }

}
