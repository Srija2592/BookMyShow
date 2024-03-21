import { createAction, props } from "@ngrx/store";
import { User } from "../user";


export const userDetails=createAction('[UserResponse] Login',props<{userResponse:User}>());


