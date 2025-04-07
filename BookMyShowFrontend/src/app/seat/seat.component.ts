import { Component, OnInit } from '@angular/core';
import { SeatService } from '../seat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { Booking } from './BookingDto';
import { AuthService } from '../shared/auth.service';
import { TheatreService } from '../theatre.service';
import { BehaviorSubject } from 'rxjs';

declare var Razorpay: any;

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css'],
})
export class SeatComponent implements OnInit {
  booked: boolean = false;
  seats: any;
  seats1 = new BehaviorSubject<Object>([]);
  location: any = '';
  movie: any = '';
  theatre: any = '';
  booking: any;
  selectedTheatre: any;
  bookedSeats: any = [];
  bookinginfo!: Booking;
  reqseats: any = [];
  selectedSeats: { seatId: number; version: number }[] = [];
  count = 0;
  map = new Map();
  username: any = '';
  transacid: string = ''; // Optional: Remove if unused
  isLoggedIn: any = undefined;
  date: any;

  constructor(
    private seatservice: SeatService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private authService: AuthService,
    private theatreService: TheatreService
  ) {
    this.location = activatedroute.snapshot.params['location'];
    this.movie = activatedroute.snapshot.params['movie'];
    this.theatre = activatedroute.snapshot.params['theatre'];
    this.date = activatedroute.snapshot.params['date-picker'];
    this.bookinginfo = {
      locationName: this.location,
      movieName: this.movie,
      theatreName: this.theatre,
      username: authService.getUserName(),
      seats: [],
      totalPrice: 0,
      paymentId: '',
      bookingTime: new Date(),
      bookingId: 0,
      bookedTime: new Date(),
    };
  }

  ngOnInit(): void {
    this.authService.loggedInn.subscribe((d) => (this.isLoggedIn = d));
    this.getseats();
    this.theatreService
      .getTheatre(this.theatre, this.movie, this.location)
      .subscribe((data) => {
        this.selectedTheatre = data;
      });
    this.seats1.subscribe((d) => (this.seats = d));
    this.authService.isLoggedIn().subscribe((d) => {
      this.isLoggedIn = d;
    });
  }

  getseats() {
    if (!this.date || !this.theatre || !this.movie || !this.location) {
      console.error("Invalid input: all parameters must be provided");
      return;
    }
    this.seatservice
      .allseats(this.date, this.theatre, this.movie, this.location)
      .subscribe({
        next: (data) => {
          if (JSON.stringify(data) !== JSON.stringify(this.seats1.value)) {
            this.seats1.next(data);
          }
          console.log("Seats:", data);
        },
        error: (err) => {
          console.error("Error fetching seats:", err);
        },
      });
  }

  selectseat(seat: any) {
    if (seat.seatStatus === 'EMPTY') {
      seat.seatStatus = 'SELECTED';
      this.map.set(seat.seatId, 'SELECTED');
    }
    else if (seat.seatStatus === 'SELECTED') {
      seat.seatStatus = 'EMPTY';
      this.map.set(seat.seatId, 'EMPTY');
    }
  }

  book() { // Removed unused 'selectedSeats' param
    this.seatservice
      .allseats(this.date, this.theatre, this.movie, this.location)
      .subscribe((latestSeats: any) => {
        this.seats1.next(latestSeats);

        let validSeats: any[] = [];
        let seatVersions: any = {};

        for (let entry of this.map.entries()) {
          if (entry[1] === 'SELECTED') {
            let seat = latestSeats.find((s: any) => s.seatId === entry[0]);
            if (seat && seat.seatStatus === 'EMPTY' && seat.version !== undefined) {
              validSeats.push(entry[0]);
              seatVersions[entry[0]] = seat.version;
            } else {
              alert(`Seat ${entry[0]} is no longer available.`);
              return;
            }
          }
        }

        if (validSeats.length === 0) {
          alert("No seats available. Please refresh and try again.");
          return;
        }

        this.bookinginfo.seats = validSeats.map(seatId => ({
          seatId: seatId,
          version: seatVersions[seatId]
        }));
        this.bookinginfo.totalPrice = validSeats.length * this.selectedTheatre.price;
        this.bookinginfo.bookedTime = this.date.toString();

        // Changed: Call initiateBooking instead of createTransaction
        this.bookingService.initiateBooking(this.bookinginfo).subscribe(
          (response) => {
            if (response.orderId) {
              this.openRazorpay(response.orderId);
            } else {
              alert("Failed to initiate booking. Please try again.");
            }
          },
          (error) => {
            if (error.status === 409) {
              alert("Booking failed due to concurrent modification. Please refresh and try again.");
            } else {
              alert("Error initiating booking: " + error.message);
            }
          }
        );
      });
  }

  // New: Minimal Razorpay trigger
  openRazorpay(orderId: string) {
    const options = {
      order_id: orderId,
      key: 'rzp_test_MAD6KIJldUXU9a', // Replace with your new Key ID
      handler: (response: any) => {
        if (response?.razorpay_payment_id) {
          this.bookingService.confirmBooking(response.razorpay_payment_id).subscribe(
            (data) => {
              this.booking = data;
              this.router.navigateByUrl('/theatre/' + this.location + '/' + this.movie);
            },
            (error) => {
              alert("Booking confirmation failed. Please contact support if charged.");
            }
          );
        } else {
          alert("Payment failed. Please try again.");
        }
      },
      prefill: {
        name: this.username,
        email: 'ds@gmail.com',
        contact: '9876543210',
      },
      notes: {
        address: 'Movie ticket booking',
      },
      theme: {
        color: '#F3254',
      },
    };
    const razorpayObject = new Razorpay(options);
    razorpayObject.open();
  }
  // Removed: openTransaction and processResponse
}
