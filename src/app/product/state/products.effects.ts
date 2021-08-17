import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProductsHttpService } from '../services/products-http/products-http.service';
import {
  addProduct,
  addProductSuccess,
  deleteProduct,
  deleteProductFail,
  deleteProductSuccess,
  editProduct,
  editProductFail,
  editProductSuccess,
} from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsHttpService: ProductsHttpService,
    private router: Router
  ) {}

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct),
      switchMap((action) => {
        return this.productsHttpService.updateProduct$(action.product).pipe(
          map((productResponse) =>
            editProductSuccess({ product: productResponse })
          ),
          catchError((err: Error) =>
            of(editProductFail({ product: action.product }))
          )
        );
      })
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      switchMap((action) => {
        return this.productsHttpService.createProduct$(action.product).pipe(
          map((productResponse) =>
            addProductSuccess({ product: productResponse })
          ),
          catchError((err: Error) =>
            of(editProductFail({ product: action.product }))
          )
        );
      })
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action) => {
        return this.productsHttpService.deleteProduct$(action.productId).pipe(
          map(() => deleteProductSuccess({ productId: action.productId })),
          catchError((err: Error) =>
            of(deleteProductFail({ productId: action.productId }))
          )
        );
      })
    )
  );

  editProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editProductSuccess, addProductSuccess, deleteProductSuccess),
        tap(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          };
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
