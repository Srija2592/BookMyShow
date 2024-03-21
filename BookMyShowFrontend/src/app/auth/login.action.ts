import { createAction, props } from "@ngrx/store";
import { LoginResponse } from "./login/loginresponse";


export const login=createAction('[LoginResponse] Login',props<{loginResponse:LoginResponse}>());
export const loginStatus=createAction('[boolean] LoginStatus',props<{loginStatus:boolean}>());
export const logout=createAction('[LoginResponse] Logout');

