import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequest } from './auth/signup/signuprequest';
import { LoginRequest } from './auth/login/loginrequest';
import { Observable, map, tap, throwError } from 'rxjs';
import { LoginResponse } from './auth/login/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();


  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private http:HttpClient,private localstorage:LocalStorageService) { }

  signup(singuprequest:SignupRequest){
    return this.http.post('http://localhost:8080/api/auth/signup',singuprequest, { responseType: 'text' });
  }

  login(loginrequest:LoginRequest):Observable<boolean>{
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login',loginrequest).pipe(map(data => {
      this.localstorage.store('authenticationToken', data.authenticationToken);
      this.localstorage.store('username', data.username);
      this.localstorage.store('refreshToken', data.refreshToken);
      this.localstorage.store('expiresAt', data.expiresAt);

      this.loggedIn.emit(true);
      this.username.emit(data.username);
      return true;
    }));
  }

  getUserName() {
    return this.localstorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }


  getRefreshToken() {
    return this.localstorage.retrieve('refreshToken');
  }


  logout() {
    this.http.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localstorage.clear('authenticationToken');
    this.localstorage.clear('username');
    this.localstorage.clear('refreshToken');
    this.localstorage.clear('expiresAt');
  }

  getJwtToken() {
    return this.localstorage.retrieve('authenticationToken');
  }

  refreshToken() {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localstorage.clear('authenticationToken');
        this.localstorage.clear('expiresAt');

        this.localstorage.store('authenticationToken',
          response.authenticationToken);
        this.localstorage.store('expiresAt', response.expiresAt);
      }));
  }
}
