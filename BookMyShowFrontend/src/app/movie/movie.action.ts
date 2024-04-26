import { createAction, props } from "@ngrx/store";
export const movie=createAction('[Movie] Fetch Movie',props<{location:string}>())
export const clearmovie=createAction('[Movie] Movie',props<{movies:any}>())
export const movieSuccess=createAction('[Movie] Set Movie Success',props<{movies:any}>())
