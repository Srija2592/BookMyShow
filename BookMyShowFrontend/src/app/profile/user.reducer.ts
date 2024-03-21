import { createReducer, on } from "@ngrx/store";
import { userDetails } from "./user.action";
import { User } from "../user";

export interface UserState {
  userResponse: User;
}
export const initialState: UserState = {
  userResponse: {
    username: '',
    roles: [],
    fullname: '',
    mobile: 0,
    email: '',
    bookingId: 0,
    id: 0
  },
};

export const UserReducer = createReducer(initialState, on(userDetails,(state,{userResponse})=>({userResponse:userResponse})));
