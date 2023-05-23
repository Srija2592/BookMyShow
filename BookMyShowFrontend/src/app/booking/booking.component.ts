import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{

  bookingId:number=0;

  booking:any;

  seats:any;

  constructor(private bookingService:BookingService,private activatedroute:ActivatedRoute){
    this.bookingId=activatedroute.snapshot.params['id'];
    console.log(this.bookingId)
    this.bookingService.booking(this.bookingId).subscribe(data=>{this.booking=data,console.log(this.booking),this.seats=this.booking.seats,console.log(this.seats)});

  }

  ngOnInit(): void {

  }




}
