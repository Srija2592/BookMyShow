import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovieService } from 'src/app/movie.service';
import { addmovie } from './addmovie.payload';
import { MovieDto } from 'src/app/movie/MovieDto';
import { LocationService } from 'src/app/location.service';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
})
export class AddmovieComponent implements OnInit {
  addedmovie: boolean = false;
  locations: any;
  movieForm!: FormGroup;
  movieDto!: MovieDto;
  isOpenCamera:boolean=false;
  constructor(
    private router: Router,
    private movieService: MovieService,
    private locationService: LocationService
  ) {
    this.movieDto = {
      movieName: '',
      locationName: '',
      movieImage: '',
    };
  }
  ngOnInit(): void {
    this.locationService.getlocations().subscribe((data) => {
      (this.locations = data), console.log(this.locations);
    });

    this.movieForm = new FormGroup({
      movie: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      movieImage: new FormControl('', Validators.required),
    });
  }

  title = 'angularwebcam';

  webcamImage!: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  addMovie() {
    this.movieDto.movieName = this.movieForm.get('movie')?.value;
    this.movieDto.locationName = this.movieForm.get('location')?.value;
    this.movieDto.movieImage = this.movieForm.get('movieImage')?.value;
    this.movieService.addmovie(this.movieDto).subscribe((data: any) => {
      console.log('movie added');
      this.addedmovie = true;
      // this.router.navigate(['']);
    });
  }
  onSelectlocation(e: any) {
    var loc = e.target.value;
    console.log(loc);
    this.movieDto.locationName = loc;
    // this.movies=this.selectservice.getmovie().filter((item)=>item.location==loc);
  }
  openCamera(){
    this.isOpenCamera=true;
  }
}
