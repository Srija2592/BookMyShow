import { Component, OnInit } from '@angular/core';
import { SeatService } from '../seat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';
import { BookingService } from '../booking.service';
import { Booking } from './BookingDto';
import { AuthService } from '../auth.service';
import { TheatreService } from '../theatre.service';
import { NgForm } from '@angular/forms';

declare var Razorpay:any;
@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit{

  booked:boolean=false;

  seats:any;

  location:any='';

  movie:any='';

  theatre:any='';

  booking:any;

  selectedTheatre:any;
  bookedSeats:any=[];

  bookinginfo!:Booking;
  reqseats:any=[];

  selectedSeats:any;
  count=0;
  map=new Map();
  username:any='';
  transacid:string='';
  constructor(private seatservice:SeatService,private activatedroute:ActivatedRoute,private router:Router,private bookingService:BookingService,private authService:AuthService,private theatreService:TheatreService){
    this.location=activatedroute.snapshot.params['location'];
    this.movie=activatedroute.snapshot.params['movie'];
    this.theatre=activatedroute.snapshot.params['theatre'];
    this.bookinginfo={
      locationName:this.location,
      movieName:this.movie,
      theatreName:this.theatre,
      username:authService.getUserName(),
      seats:[],
      totalPrice:0,
      transactionId:'',
      bookingTime:new Date()
    }

  }

  ngOnInit(): void {
    this.getseats();
    this.theatreService.getTheatre(this.theatre,this.movie,this.location).subscribe((data)=>{this.selectedTheatre=data});
  }

  getseats(){
    this.seatservice.allseats(this.theatre,this.movie,this.location).subscribe(data=>{
      this.seats=data
      console.log(this.seats);
    })
  }

  selectseat(seat:any){
    let selected:boolean=false;
    if(seat.seatStatus=='EMPTY'){
      seat.seatStatus='SELECTED';
      selected=true;
      this.map.set(seat.seatId,'SELECTED');
    }
    else{
      seat.seatStatus='EMPTY';
      selected=false;
      this.map.set(seat.seatId,'EMPTY');
    }

  }

  book(selectedSeats:any){
    console.log(this.map);
    for(let entry of this.map.entries()){
      if(entry[1]=='SELECTED'){
        selectedSeats+=1;
        this.reqseats.push(entry[0]);
        this.bookinginfo.seats.push(entry[0]);
      }
    }

    this.bookinginfo.totalPrice=this.bookinginfo.seats.length*this.selectedTheatre.price;
    console.log(this.bookinginfo.totalPrice);
    this.bookingService.createTransaction(this.bookinginfo.totalPrice).subscribe(
      (response)=>{
        console.log(response);
        this.openTransaction(response,this.bookinginfo);
        console.log(this.bookinginfo);
        // this.bookingService.book(this.bookinginfo,this.transacid).subscribe(data=>{this.booking=data,console.log(this.transacid)});
      },
      (error)=>{
        console.log(error);
      }

    );
    console.log(this.bookedSeats);
  }

  openTransaction(response:any,bookinginfo:Booking){
    var options={
      order_id:response.orderId,
      key:response.key,
      amount:response.amount,
      currency:response.currency,
      name:this.username,
      description:'Payment for selected movie seats',
      image:'https://cdn.pixabay.com/photo/2023/09/02/15/34/mountains-8229139_1280.jpg',
      handler:(response:any)=>{
        if(response!=null && response.razorpay_payment_id!=null){
          this.bookinginfo.transactionId=response.razorpay_payment_id;
          // this.processResponse(response,bookinginfo,bookinginfo.transactionId);
          console.log(this.bookinginfo);
          this.bookingService.book(this.bookinginfo,bookinginfo.transactionId).subscribe(data=>{this.booking=data,console.log(bookinginfo.transactionId)});
        }
        else{
          alert("payment failed");
        }
      },
      prefill:{
        name:this.username,
        email:'ds@gmail.com',
        contact:'9876543210'
      },

        notes:{
          address:'Movie ticket booking',
        },
        theme:{
          color:'#F3254'
        }
      };
      var razorpayObject=new Razorpay(options);
      razorpayObject.open();
    }

processResponse(resp:any,bo:Booking,tid:string){
  bo.transactionId=resp.razorpay_payment_id;
  this.transacid=bo.transactionId;
  tid=bo.transactionId;
  console.log(tid);
}
  }


