import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import { MovieService } from '../movie.service';
import { movie, movieSuccess } from './movie.action';

@Injectable()
export class MovieEffects {
  constructor(
    private actions$: Actions,
    private movieService:MovieService
  ) {}

  fetchMovies$ = createEffect(() => this.actions$.pipe(
    ofType(movie),
    switchMap(action =>
      this.movieService.allmoviesbylocation(action.location).pipe(
        map(movies => movieSuccess({ movies:movies })),
        catchError(() => of({ type: '[Movie] Fetch Locations Error' }))
      )
    )
  ));
}
