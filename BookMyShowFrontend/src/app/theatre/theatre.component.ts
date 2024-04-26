import { Component, OnInit } from '@angular/core';
import { TheatreService } from '../theatre.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { Store } from '@ngrx/store';
import { TheatreState } from './theatre.reducer';
import { cleartheatre, theatre, theatreSuccess } from './theatre.action';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css'],
})
export class TheatreComponent implements OnInit {
  role: string[] = [];
  isLoggedIn: any = undefined;
  movie: any;
  display: any = undefined;
  location: any;

  theatres: any;
  private destroy$: Subject<void> = new Subject();
  constructor(
    private theatreservice: TheatreService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private store: Store<TheatreState>
  ) {
    this.movie = this.activatedroute.snapshot.params['movie'];
    this.location = activatedroute.snapshot.params['location'];
    this.role = authService.getUserRole();
  }

  ngOnInit(): void {
    this.authService.loggedInn.subscribe((d) => (this.isLoggedIn = d));
    this.authService.isLoggedIn().subscribe((d) => {
      this.isLoggedIn = d;
    });
    this.gettheatres();
    this.store
      .select('theatres')
      .subscribe((d) => {this.theatres = d.theatres;
      if (this.theatres.length == 0) {
        this.display = false;
      } else {
        this.display = true;
      }
    }
  )
  }

  gettheatres() {
    this.theatreservice
      .theatresbymoviename(this.movie, this.location)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.store.dispatch(theatreSuccess({ theatres: data }));
      });
  }

  openseats(theatre: any) {
    this.router.navigateByUrl(
      '/seat/' + this.location + '/' + this.movie + '/' + theatre
    );
  }

  getInf: boolean = false;
  getInfo(theatre: any) {
    this.getInf = true;
  }
  goBack() {
    this.getInf = false;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.store.dispatch(cleartheatre({
      theatres:[]
    }));
  }
}
