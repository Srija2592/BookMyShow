import { Component, OnInit } from '@angular/core';
import { TheatreService } from '../theatre.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {

  movie:any;

  location:any;

  theatres:any;

  constructor(private theatreservice:TheatreService,private activatedroute:ActivatedRoute,private router:Router){
    this.movie=this.activatedroute.snapshot.params['movie'];
    this.location=activatedroute.snapshot.params['location'];
  }

  ngOnInit(): void {
    this.gettheatres()

  }

  gettheatres(){
    this.theatreservice.theatresbymoviename(this.movie,this.location).subscribe(data=>{this.theatres=data});
  }

  openseats(theatre:any){
    this.router.navigateByUrl('/seat/'+this.location+'/'+this.movie+'/'+theatre);
  }



}
