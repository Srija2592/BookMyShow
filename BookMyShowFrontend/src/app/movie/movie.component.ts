import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Store } from '@ngrx/store';
import { MovieState } from './movie.reducer';
import { clearmovie, movie, movieSuccess } from './movie.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  location: string;

  movies: any;
  role:string[]=[];
  filteredMovies: any = [];
  isLoggedIn: any = undefined;
  private destroy$:Subject<void>=new Subject();
  constructor(
    private movieService: MovieService,
    private act: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store:Store<MovieState>
  ) {
    this.role = authService.getUserRole();
    authService.loggedInn.subscribe((d) => (this.isLoggedIn = d));
    this.location = this.act.snapshot.params['location'];


    this.filteredMovies = movieService.allmoviesbylocation(this.location);
  }

  display: any = undefined;
  ngOnInit(): void {
    this.authService.loggedInn.subscribe((d) => (this.isLoggedIn = d));
    this.getmoviesbylocation();
    this.authService.isLoggedIn().subscribe((d) => {
      this.isLoggedIn = d;
    });

    this.store.select('movies').subscribe(d=>{this.movies=d.movies;
      if (this.movies.length == 0) {
        this.display = false;
      } else {
        this.display = true;
      }
    });
  }

  getmoviesbylocation() {
    this.movieService.allmoviesbylocation(this.location).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.store.dispatch(movieSuccess({movies:data}));
    });
    // this.store.dispatch(movie({location:this.location}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(clearmovie({
      movies:[]
    }));
  }
  opentheatres(movie: any) {
    this.router.navigateByUrl('/theatre/' + this.location + '/' + movie);
  }

  searchFound: boolean = false;
  filterResults(text: string) {
    if (!text) {
      this.filteredMovies = this.movies;
    }

    this.filteredMovies = this.movies.filter((loc: any) =>
      loc?.movieName.toLowerCase().includes(text.toLowerCase())
    );
    if (this.filteredMovies.length != 0) {
      this.searchFound = true;
    }
    text = '';
  }
  chunkedArray(arr:any, chunkSize:number) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
