import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.css']
})
export class BookingModalComponent {

  booking:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogref:MatDialogRef<BookingModalComponent>,public dialog: MatDialog,){
    this.booking=data
  }
}
