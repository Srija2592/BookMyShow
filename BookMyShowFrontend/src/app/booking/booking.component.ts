import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { AuthService } from '../shared/auth.service';
import { AgGridAngular } from 'ag-grid-angular'; // AG Grid Component
import { ColDef,GridApi,
  GridOptions,
  GridReadyEvent,
  RowClickedEvent
 } from 'ag-grid-community';
import { BookingModalComponent } from '../booking-modal/booking-modal.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  standalone:true,
  imports: [AgGridAngular],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{

  public themeClass: string = "ag-theme-quartz";

  colDefs: ColDef[] = [
    { field: "bookingId",headerName:'Booking Id' },
    { field: "paymentStatus",headerName:'Payment Status' },
    { field: "totalPrice", headerName:'Total Price' },
    { field: "transactionId", headerName:'Transaction Id' },
    { field: "seats", headerName:'Seats' },
    { field: "bookingTime",headerName:'Booking Time' },
  ];


  username:string='';

  booking:any;

  seats:any;

  isLoggedIn !:boolean;
  bookings:any=[];
  constructor(private bookingService:BookingService,private activatedroute:ActivatedRoute,private authService:AuthService,public dialog: MatDialog,){
    this.username=activatedroute.snapshot.params['id'];
    // this.bookingService.booking(this.bookingId).subscribe(data=>{this.booking=data,console.log(this.booking),this.seats=this.booking.seats,console.log(this.seats)});
    // this.bookingService
    //   .allbookings(this.username)
    //   .subscribe((data) => {
    //     (this.bookings = data);
    //     let seatIds = this.bookings.map((booking: { seats: any[]; })=>booking.seats.map(seat => seat.seatId).join(', '));
    //     for(let i=0;i<this.bookings.length;i++){
    //       this.bookings[i].seats=seatIds[i];
    //     }
    //       // (this.open = true),
    //       // (this.noofbookings = this.bookings.length);
    //       // this.router.navigateByUrl('/booking/'+username);
    //   });

  }

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  ngOnInit(): void {
    this.authService.loggedInn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
    this.authService.isLoggedIn().subscribe((d) => {
      this.isLoggedIn = d;
    });
  }
    onGridReady(params: GridReadyEvent<any>) {
      this.bookingService
      .allbookings(this.username)
      .subscribe((data) => {
        (this.bookings = data);
        let seatIds = this.bookings.map((booking: { seats: any[]; })=>booking.seats.map(seat => seat.seatId).join(', '));
        for(let i=0;i<this.bookings.length;i++){
          this.bookings[i].seats=seatIds[i];
        }

      });
    }
    rowClicked($event:RowClickedEvent){
      console.log($event.data.bookingId);

      this.bookingService.booking($event.data.bookingId).subscribe(data=>{this.booking=data,console.log(this.booking);
        this.dialog.open(BookingModalComponent, {
          data: data,
          height: '400px',
          width: '800px',
        });
      });
    }
  }





