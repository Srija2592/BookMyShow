import { createReducer, on } from '@ngrx/store';
import { LoginResponse } from './login/loginresponse';
import { login, loginStatus, logout } from './login.action';

export interface LoginState {
  loginResponse: LoginResponse;
}
export interface LoginStatusState {
  loginStatus: boolean;
}
export interface LogoutStatusState {
  logoutStatus: boolean;
}
export const initialState: LoginState = {
  loginResponse: {
    username: '',
    authenticationToken: '',
    expiresAt: new Date(),
    refreshToken: '',
    roles: [],
  },
};
export const loginSta: LoginStatusState = { loginStatus: false };
export const logoutSta: LogoutStatusState = { logoutStatus: false };
export const LoginReducer = createReducer(
  initialState,
  on(login, (state, { loginResponse }) => ({ loginResponse: loginResponse }))
);
export const LoginStatusReducer = createReducer(
  loginSta,
  on(loginStatus, (state, { loginStatus }) => ({ loginStatus: loginStatus }))
);

