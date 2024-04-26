import { createReducer, on } from "@ngrx/store";
import { cleartheatre,theatreSuccess } from "./theatre.action";

export interface TheatreState {
  theatres: any
}
export const initialState: TheatreState = {
  theatres:[]
};

export const TheatreReducer = createReducer(
  initialState,
  on(cleartheatre,state=>initialState),
  on(theatreSuccess,(state,{theatres})=>({theatres:theatres})),
);

