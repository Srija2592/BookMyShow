import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/location.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {
  addingLocation:boolean=false;
  addingMovie:boolean=false;
  addingTheatre:boolean=false;
  constructor(private router:Router) {

  }
  addloc(){
    this.addingLocation=!this.addingLocation;
  }
  addtheatre(){
    this.addingTheatre=!this.addingTheatre;
  }
  addmovie(){
    this.addingMovie=!this.addingMovie;
  }
  navigatetolocation(){
    console.log("working")
    this.router.navigate(['/admin/adminhome/addlocation']);
    console.log("done");
  }
}
