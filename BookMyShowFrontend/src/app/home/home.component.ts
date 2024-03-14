import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  role!: string;

  constructor(private authService: AuthService, private router: Router) {}

  // if user is admin then redirect to admin module
  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    console.log(this.role);
    if (this.role == 'ROLE_ADMIN' && this.authService.loggedInn) {
      this.router.navigate(['/admin']);
    } else if (this.role == 'ROLE_USER' &&  this.authService.loggedInn) {
      this.router.navigate(['/location']);
    }
  }
}
