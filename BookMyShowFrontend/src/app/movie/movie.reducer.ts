import { createReducer, on } from "@ngrx/store";
import { clearmovie,movieSuccess } from "./movie.action";

export interface MovieState {
  movies: any
}
export const initialState: MovieState = {
  movies:[]
};

export const MovieReducer = createReducer(
  initialState,
  on(clearmovie,state=>initialState),
  on(movieSuccess,(state,{movies})=>({movies:movies})),
);

