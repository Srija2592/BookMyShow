import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { UserService } from '../user.service';
import { AuthGuard } from '../auth.guard';
import { Store } from '@ngrx/store';
import { LoginState, LoginStatusState } from '../auth/login.reducer';
import { login, loginStatus } from '../auth/login.action';
import { LoginResponse } from '../auth/login/loginresponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  username!: string;
  loginDetails!: Observable<LoginState>;
  user: any = {
    fullname: '',
    username: '',
    mobile: 0,
    email: '',
    id: 0,
    bookingId: 0,
  };
  loginResponse: LoginResponse = {
    username: '',
    authenticationToken: '',
    expiresAt: new Date(),
    refreshToken: '',
    roles: [],
  };
  constructor(
    private router: Router,
    private authservice: AuthService,
    public dialog: MatDialog,
    private userService: UserService,
    private authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    this.authservice.loggedInn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });

    console.log(this.isLoggedIn);
    this.authservice.username.subscribe(
      (data: string) => (this.username = data)
    );

    this.username = this.authservice.getUserName();
  }
  logout() {
    this.authservice.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  update() {
    this.userService.getuser(this.username).subscribe((data) => {
      this.dialog.open(UpdateComponent, {
        data: data,
        height: '400px',
        width: '800px',
      });
    });
  }

  profile(username:string) {
    this.router.navigateByUrl('/profile/' + username);
  }
}
