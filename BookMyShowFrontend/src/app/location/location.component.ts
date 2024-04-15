import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: any;

  movielist: any;

  role: string[] = [];
  isLoggedIn: any = undefined;
  display: any = undefined;
  filteredLocations: any = [];
  constructor(
    private locationService: LocationService,
    private router: Router,
    private authService: AuthService
  ) {
    this.filteredLocations = locationService.getlocations();
    this.role = authService.getUserRole();
  }

  ngOnInit(): void {
    this.authService.loggedInn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });

    this.locationService.getlocations().subscribe((data) => {
      this.locations = data;
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

  openmovies(location: any) {
    this.movielist = location.movieList;

    if (this.role[0] == 'ROLE_USER') {
      this.router.navigateByUrl('/movie/' + location.locationName);
    } else {
    }
  }
}
