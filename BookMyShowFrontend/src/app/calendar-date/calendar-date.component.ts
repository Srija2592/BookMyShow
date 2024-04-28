import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-calendar-date',
  templateUrl: './calendar-date.component.html',
  styleUrls: ['./calendar-date.component.css'],
  standalone: true,
  providers: [NativeDateAdapter,DatePipe],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
  ],
})
export class CalendarDateComponent {
  movie: any;
  location: any;
  theatre:any;
  date:any;
  todayDate:Date=new Date();
  maxDate = new Date(this.todayDate);

  constructor(private datePipe: DatePipe,private router:Router,private activatedRoute:ActivatedRoute) {
    this.movie = this.activatedRoute.snapshot.params['movie'];
    this.location = activatedRoute.snapshot.params['location'];
    this.theatre = this.activatedRoute.snapshot.params['theatre'];
    this.date = activatedRoute.snapshot.params['date-picker'];
    this.maxDate.setDate(this.maxDate.getDate()+30);
    datePipe.transform(this.maxDate,'yyyy-MM-dd');
  }

  formatDate(date: Date): any {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  selectedDate =new Date();

  updateDOB(dateObject:any) {
    this.selectedDate=this.formatDate(dateObject.value);
  }
  selectDate(date:Date){
        this.router.navigateByUrl(
      '/seat/' + this.location + '/' + this.movie + '/' + this.theatre+'/'+this.selectedDate.toString()
    );
  }
}
