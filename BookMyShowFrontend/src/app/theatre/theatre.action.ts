import { createAction, props } from "@ngrx/store";
export const theatre=createAction('[Theatre] Fetch Theatre',props<{location:string,movie:string}>())
export const cleartheatre=createAction('[Theatre] Theatre',props<{theatres:any}>())
export const theatreSuccess=createAction('[Theatre] Set Theatre Success',props<{theatres:any}>())
