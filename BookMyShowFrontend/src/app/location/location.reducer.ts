import { createReducer, on } from "@ngrx/store";
import { clearlocation, locations } from "./location.action";

export interface LocationState {
  locations: any;
}
export const initialState: LocationState = {
  locations:[]
};
export const LocationReducer = createReducer(
  initialState,
  on(locations, (state, { locations }) => ({ locations:locations })),
  on(clearlocation,state=>initialState)
);
