import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import {
  loginAdminSuccess,
  loginCustomerSuccess,
} from '../../user/state/users.actions';
import { CartsHttpService } from '../services/carts-http/carts-http.service';
import {
  addProductToCart,
  addProductToCartFail,
  addProductToCartSuccess,
  loadCartFail,
  loadCartSuccess,
} from './cart.actions';
import { selectCartState } from './cart.selectors';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private cartsHttpService: CartsHttpService,
    private store: Store
  ) {}

  loadCartOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAdminSuccess, loginCustomerSuccess),
      switchMap((action) =>
        this.cartsHttpService.getSingleCart(action.user.id).pipe(
          map((response) => {
            return loadCartSuccess({ cart: response });
          }),
          catchError((err: Error) => of(loadCartFail()))
        )
      )
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductToCart),
      mergeMap((action) =>
        this.store.pipe(
          select(selectCartState),
          take(1),
          switchMap((cart) => {
            return this.cartsHttpService.addProductToCart(cart).pipe(
              map(() => {
                return addProductToCartSuccess({ productId: action.productId });
              }),
              catchError((err: Error) =>
                of(addProductToCartFail({ productId: action.productId }))
              )
            );
          })
        )
      )
    )
  );
}
