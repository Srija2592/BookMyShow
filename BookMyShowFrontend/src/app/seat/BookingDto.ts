export interface Booking {
  bookingId: number;
  locationName: string;
  movieName: string;
  theatreName: string;
  username: string;
  seats: Array<{ seatId: number; version: number }>; // Store seat version for concurrency check
  totalPrice: number;
  paymentId: string;
  bookingTime: Date;
  bookedTime: Date;
}
