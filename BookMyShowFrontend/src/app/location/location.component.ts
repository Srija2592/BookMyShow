import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Store } from '@ngrx/store';
import { LocationState } from './location.reducer';
import { clearlocation, locations } from './location.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit,OnDestroy {
  locations: any;

  movielist: any;

  role: string[] = [];
  isLoggedIn: any = undefined;
  display: any = undefined;
  filteredLocations: any = [];
  private destroy$:Subject<void>=new Subject();
  constructor(
    private locationService: LocationService,
    private router: Router,
    private authService: AuthService,
    private store:Store<LocationState>
  ) {
    this.filteredLocations = locationService.getlocations();
    this.role = authService.getUserRole();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(clearlocation({locations:[]}));
  }

  ngOnInit(): void {
    this.authService.loggedInn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });

    this.authService.isLoggedIn().subscribe((d) => {
      this.isLoggedIn = d;
    });
    this.locationService.getlocations().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.store.dispatch(locations({locations:data}));
    });
    this.store.select('locations').subscribe((d)=>{this.locations=d.locations;
      if (this.locations.length == 0) {
        this.display = false;
      } else {
        this.display = true;
      }
    });
  }

  searchFound: boolean = false;

  filterResults(text: string) {
    if (!text) {
      this.filteredLocations = this.locations;
    }

    this.filteredLocations = this.locations.filter((loc: any) =>
      loc?.locationName.toLowerCase().includes(text.toLowerCase())
    );
    if (this.filteredLocations.length != 0) {
      this.searchFound = true;
    }
  }

  chunkedArray(arr:any, chunkSize:number) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
  openmovies(location: any) {
    this.movielist = location.movieList;

    if (this.role[0] == 'ROLE_USER') {
      this.router.navigateByUrl('/movie/' + location.locationName);

    } else {
    }
  }

}
