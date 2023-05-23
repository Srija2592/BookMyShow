import { Component, OnInit } from '@angular/core';

import {User} from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  username!: string;

  user:User={

    'fullname':'',

    'username':'',
    'mobile':0
  };

  constructor(private router:Router,private authservice:AuthService,public dialog: MatDialog){}

  ngOnInit(): void {
    this.authservice.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    this.authservice.username.subscribe((data: string) => this.username = data);
    this.isLoggedIn = this.authservice.isLoggedIn();
    this.username = this.authservice.getUserName();

  }
  logout() {
    this.authservice.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/login');
  }

  update(){
    const data = this.user;
    this.dialog.open(UpdateComponent, {
      data: data,
      height: '400px',
      width: '800px',
    });
  }

  profile(){
    this.router.navigateByUrl('/profile/' + this.username);
  }


}
