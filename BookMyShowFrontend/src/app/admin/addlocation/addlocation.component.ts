import { Component, OnInit } from '@angular/core';
import { addlocation } from './addlocation.payload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/location.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.component.html',
  styleUrls: ['./addlocation.component.css']
})
export class AddlocationComponent implements OnInit{
  addedlocation:boolean=false;
  location!:addlocation;
  locationForm!:FormGroup;
  constructor(private router:Router,private locationService:LocationService){
    this.location={
      location:''
    }
  }
  ngOnInit(): void {
    this.locationForm = new FormGroup({
      location: new FormControl('', Validators.required),
    });
  }
  addLocation(){
    this.location.location=this.locationForm.get('location')?.value;
    this.locationService.addlocation(this.location.location).subscribe((data:any)=>{
      // this.router.navigate(['admin/adminhome/addmovie/'+this.location.location]);
      console.log("location added");
      this.addedlocation=true;
    },
    (error:any) => {
      throwError(error);
    });
  }
}
