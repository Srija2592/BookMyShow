import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { SignupRequest } from './auth/signup/signuprequest';
import { LoginRequest } from './auth/login/loginrequest';
import {
  BehaviorSubject,
  Observable,
  Subject,
  map,
  tap,
  throwError,
} from 'rxjs';
import { LoginResponse, RefreshTokenPayload } from './auth/login/loginresponse';
import { Store, select } from '@ngrx/store';
import { LoginState, LoginStatusState } from './auth/login.reducer';
import { login, loginStatus, logout } from './auth/login.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedInn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  userModel: LoginResponse = {
    authenticationToken: '',
    refreshToken: '',
    expiresAt: new Date(),
    username: '',
    roles: [],
  };
  loginDetails = new BehaviorSubject<LoginResponse>(this.userModel);
  loginStatus = new BehaviorSubject<boolean>(false);
  loginResponse!: LoginResponse;
  userDetails: LoginResponse = {
    authenticationToken: '',
    refreshToken: '',
    expiresAt: new Date(),
    username: '',
    roles: [],
  };

  refreshTokenPayload=new BehaviorSubject<RefreshTokenPayload>({username:'',refreshToken:''});


  constructor(
    private http: HttpClient,
    private localstorage: LocalStorageService,
    private store: Store<{ loginState: LoginState }>,
    private store1: Store<{ loginStatusState: LoginStatusState }>
  ) {
    this.store.pipe(select('loginState')).subscribe((d) => {
      this.loginDetails.next(d.loginResponse);
    });
    this.store1.pipe(select('loginStatusState')).subscribe((d) => {
      this.loginStatus.next(d.loginStatus);
    });
    this.loginDetails.subscribe((d) => {
      this.loginDetails.next(d);
      let rp:RefreshTokenPayload={
        refreshToken:d.refreshToken,username:d.username
      }
      this.refreshTokenPayload.next(rp);
    });
  }

  signup(singuprequest: SignupRequest) {
    return this.http.post(
      'http://localhost:8080/api/auth/signup',
      singuprequest,
      { responseType: 'text' }
    );
  }

  login(loginrequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>('http://localhost:8080/api/auth/login', loginrequest)
      .pipe(
        map((data) => {
          this.store.dispatch(login({ loginResponse: data }));
          this.refreshTokenPayload.next({
            username:data.username,
            refreshToken:data.refreshToken
          })
          this.loggedInn.emit(true);
          this.username.emit(data.username);
          return data;
        })
      );
  }


  isLoggedIn(): Observable<boolean> {
    return this.http
      .get<boolean>('http://localhost:8080/api/auth/loggedIn')
      .pipe(
        map((data) => {
          this.store1.dispatch(loginStatus({ loginStatus: data }));
          this.loggedInn.emit(data);
          return data;
        })
      );
    // let sta=this.getJwtToken()!=null;
    // this.store1.dispatch(loginStatus({loginStatus:sta}));
    // this.loggedInn.emit(sta);
    // console.log(sta);
    // return sta;
  }

  getRefreshToken() {
    let refToken: string = '';
    this.loginDetails.subscribe((d) => {
      refToken = d.refreshToken;
    });
    return refToken;
  }

  logout() {
    this.http
      .post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          this.store.dispatch(login({ loginResponse: this.userModel }));
          this.refreshTokenPayload.next({
            username:'',refreshToken:''
          })
        },
        (error) => {
          throwError(error);
        }
      );
  }

  getJwtToken() {
    let jwtToken: string = '';
    this.loginDetails.subscribe((d) => {
      jwtToken = d.authenticationToken;
    });
    return jwtToken;
  }

  getUserRole() {
    let roles: string[] = [];
    this.loginDetails.subscribe((d) => {
      roles = d.roles;
    });
    return roles;
  }
  getLoginStatus() {
    let status: boolean = false;
this.isLoggedIn().subscribe(d=>{
      status=d
    })
    return status;
  }
  getUserName() {
    let username: string = '';
    this.loginDetails.subscribe((d) => {
      username = d.username;
    });
    return username;
  }

  refreshToken() {
    let rf={};
    let user:LoginResponse={
      username:'',
      authenticationToken:'',
      refreshToken:'',
      roles:[],
      expiresAt:new Date()
    };
    this.refreshTokenPayload.subscribe(d=>rf=d);
    this.loginDetails.subscribe(d=>{
      user.username=d.username,
      user.authenticationToken=d.authenticationToken,
      user.expiresAt=d.expiresAt,
      user.roles=d.roles,
      user.refreshToken=d.refreshToken
    });
    return this.http
      .post<LoginResponse>(
        'http://localhost:8080/api/auth/refresh/token',
        rf
      )
      .pipe(
        tap((response) => {
          this.userModel.authenticationToken = response.authenticationToken;
          this.userModel.expiresAt = response.expiresAt;

          this.store.dispatch(login({ loginResponse: {
            username:user.username,
            authenticationToken:response.authenticationToken,
            expiresAt:response.expiresAt,
            refreshToken:user.refreshToken,
            roles:user.roles
          } }));
        })
      );
  }
}
