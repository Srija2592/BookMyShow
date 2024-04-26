import { createAction, props } from "@ngrx/store";

export const locations=createAction('[Location] Location',props<{locations:any}>());
export const clearlocation=createAction('[Location1] Location1',props<{locations:any}>())
