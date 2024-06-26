export interface Booking{
  bookingId: number;
  locationName:string;
  movieName:string;
  theatreName:string;
  username:string;
  seats:Array<number>;
  totalPrice:number;
  transactionId:string;
  bookingTime:Date;
  bookedTime:Date;
}
