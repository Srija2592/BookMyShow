export interface Booking{
  locationName:string;
  movieName:string;
  theatreName:string;
  username:string;
  seats:Array<number>;
  totalPrice:number;
  transactionId:string;
}
