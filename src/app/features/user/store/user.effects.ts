import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../../../core/services/user.service';
import {UserActions} from './user.actions';
import {catchError, map, mergeMap, of} from 'rxjs';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  userService = inject(UserService);

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    mergeMap(() => this.userService.getUsers$().pipe(
      map(users => UserActions.usersLoadedSuccess({users})),
      catchError(error => of(UserActions.usersLoadedError({error: error.message})))
    ))
  ));
}
