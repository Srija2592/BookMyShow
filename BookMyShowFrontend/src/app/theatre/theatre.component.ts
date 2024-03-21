import { Component, OnInit } from '@angular/core';
import { TheatreService } from '../theatre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {

  role:string[]=[];
  isLoggedIn:boolean=false;
  movie:any;
  display:boolean=false;
  location:any;

  theatres:any;

  constructor(private theatreservice:TheatreService,private activatedroute:ActivatedRoute,private router:Router,private authService:AuthService){
    this.movie=this.activatedroute.snapshot.params['movie'];
    this.location=activatedroute.snapshot.params['location'];
    this.role = authService.getUserRole();
  }

  ngOnInit(): void {
    this.authService.loggedInn.subscribe((d) => (this.isLoggedIn = d));
    this.gettheatres();

  }

  gettheatres(){
    this.theatreservice.theatresbymoviename(this.movie,this.location).subscribe(data=>{this.theatres=data;

      if(this.theatres.length==0){
        this.display=false;
      }
      else{
        this.display=true;
      }});

  }

  openseats(theatre:any){
    this.router.navigateByUrl('/seat/'+this.location+'/'+this.movie+'/'+theatre);
  }

  getInf:boolean=false;
  getInfo(theatre:any){
    this.getInf=true;
  }
  goBack(){
    this.getInf=false;
  }
}
