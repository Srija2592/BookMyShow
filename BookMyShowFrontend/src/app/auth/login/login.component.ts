import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from './loginrequest';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { Store } from '@ngrx/store';
import { LoginState } from '../login.reducer';
import { login } from '../login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginRequest!: LoginRequest;
  registerSuccessMessage: string = '';
  isError!: boolean;
  loginState$: Observable<LoginState>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private store: Store<{ loginState: LoginState }>
  ) {
    this.loginState$ = store.select('loginState');
    this.loginRequest = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (
        params['registered'] !== undefined &&
        params['registered'] === 'true'
      ) {
      }
    });
  }

  login() {
    this.loginRequest.username = this.loginForm.get('username')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequest).subscribe(
      (data) => {
        this.isError = false;
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      },
      (error) => {
        this.isError = true;
        throwError(error);
      }
    );
  }
}
