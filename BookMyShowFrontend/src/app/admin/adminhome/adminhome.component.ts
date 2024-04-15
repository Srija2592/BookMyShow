import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/admin.service';
import { AuthService } from 'src/app/auth.service';
import { LocationService } from 'src/app/location.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnDestroy {
  addingLocation:boolean=false;
  addingMovie:boolean=false;
  addingTheatre:boolean=false;
  addingSeat:boolean=false;
  selectedAttribute: any;
  isLoggedIn:any=undefined;
  constructor(private router:Router,private adminService:AdminService,private authService:AuthService) {

  }

  ngOnInit(): void {
    this.adminService.selectedAttribute.subscribe((data)=>{this.selectedAttribute=data;console.log(this.selectedAttribute)});
    this.authService.loggedInn.subscribe((d) => {
      this.isLoggedIn = d;
    });
  }
  addloc(){
    this.adminService.selectedAttribute.next('location');
    this.addingLocation=!this.addingLocation;
  }
  addtheatre(){
    this.adminService.selectedAttribute.next('theatre');
    this.addingTheatre=!this.addingTheatre;
  }
  addmovie(){
    this.adminService.selectedAttribute.next('movie');
    this.addingMovie=!this.addingMovie;
  }
  addseat(){
    this.adminService.selectedAttribute.next('seat');
    this.addingSeat=!this.addingSeat;
  }
  navigatetolocation(){
    console.log("working")
    this.router.navigate(['/admin/adminhome/addlocation']);
    console.log("done");
  }
  ngOnDestroy() {
    this.adminService.selectedAttribute.unsubscribe();
 }
}
