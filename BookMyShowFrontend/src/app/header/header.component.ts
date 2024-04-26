import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from 'src/app/update/update.component';
import { UserService } from 'src/app/user.service';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { LoginResponse } from 'src/app/auth/login/loginresponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  username!: string;
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
    this.authservice.isLoggedIn().subscribe((d) => {
      this.isLoggedIn = d;
    });


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
