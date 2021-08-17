import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { UsersHttpService } from '../services/users-http/users-http.service';
import {
  loginAdmin,
  loginAdminFail,
  loginAdminSuccess,
  loginCustomer,
  loginCustomerFail,
  loginCustomerSuccess,
} from './users.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private usersHttpService: UsersHttpService
  ) {}

  loginAdminUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAdmin),
      switchMap(() =>
        this.usersHttpService.getSingleUser$(1).pipe(
          map((response) => {
            return loginAdminSuccess({ user: response });
          }),
          catchError((err: Error) => of(loginAdminFail()))
        )
      )
    )
  );

  loginCustomerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginCustomer),
      switchMap(() =>
        this.usersHttpService.getSingleUser$(2).pipe(
          map((response) => {
            return loginCustomerSuccess({ user: response });
          }),
          catchError((err: Error) => of(loginCustomerFail()))
        )
      )
    )
  );
}
