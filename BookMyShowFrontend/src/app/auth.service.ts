import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequest } from './auth/signup/signuprequest';
import { LoginRequest } from './auth/login/loginrequest';
import { BehaviorSubject, Observable, Subject, map, tap, throwError } from 'rxjs';
import { LoginResponse } from './auth/login/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedInn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  loginDetails=new Subject<LoginResponse>();
  loginResponse!:LoginResponse;
  userModel:LoginResponse={
    authenticationToken: '',
    refreshToken: '',
    expiresAt: new Date(),
    username: '',
    roles:[]
  }
  user=new BehaviorSubject<LoginResponse>(this.userModel);

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private http:HttpClient,private localstorage:LocalStorageService) { }

  signup(singuprequest:SignupRequest){
    return this.http.post('http://localhost:8080/api/auth/signup',singuprequest, { responseType: 'text' });
  }

  login(loginrequest:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', loginrequest).pipe(map(data => {
      this.localstorage.store('authenticationToken', data.authenticationToken);
      this.localstorage.store('username', data.username);
      this.localstorage.store('refreshToken', data.refreshToken);
      this.localstorage.store('expiresAt', data.expiresAt);
      this.localstorage.store('roles', data.roles);
      this.isLoggedIn().subscribe((d)=>{
        this.loggedInn.emit(d);
        console.log(d);
      })

      this.username.emit(data.username);
      this.user.next(data);
      this.user.subscribe((d)=>{console.log(d)});
      return data;
    }));
  }

  getUserName() {
    return this.localstorage.retrieve('username');
  }

  isLoggedIn(): Observable<boolean> {
   return this.http.get<boolean>('http://localhost:8080/api/auth/loggedIn');


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

  getUserRole() {
        return this.localstorage.retrieve('roles');
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
        this.loginResponse.authenticationToken=response.authenticationToken;
        this.loginResponse.expiresAt=response.expiresAt;
        console.log(this.loginResponse)
      }));
  }
}
