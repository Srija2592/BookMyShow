import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginState, LoginStatusState } from '../auth/login.reducer';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  role!: string[];
  isLoggedIn: any=undefined;
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<{ loginState: LoginState }>,
    private store1: Store<{ loginStatusState: LoginStatusState }>
  ) {}
  // if user is admin then redirect to admin module
  ngOnInit(): void {
    this.authService.loggedInn.subscribe((d) => {
      this.isLoggedIn = d;
    });

    this.role = this.authService.getUserRole();
    if (this.role[0] == 'ROLE_ADMIN' && this.authService.isLoggedIn()) {
      this.router.navigate(['/admin']);
    } else if (this.role[0] == 'ROLE_USER' && this.authService.isLoggedIn()) {
      this.router.navigate(['/location']);
    } else if (this.authService.isLoggedIn()) {
      this.router.navigate(['']);
    } else if(!this.authService.isLoggedIn()){
      this.router.navigate(['/unauthorized']);
    }
  }
}
