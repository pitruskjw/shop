import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, concat, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Cart } from '../../../models/cart';
import { CartViewModel, ProductViewModel } from '../../../models/cartViewModel';
import { ProductsService } from '../../../product/services/products/products.service';
import { addProductToCart } from '../../state/cart.actions';
import { selectCartState } from '../../state/cart.selectors';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private store: Store, private productsService: ProductsService) {}

  public fetchAndStoreCartProducts$(): Observable<void> {
    return this.getCart$().pipe(
      switchMap((cart) => {
        return this.productsService.provideAndStoreProducts$(
          cart?.products?.map((p) => p.id)
        );
      })
    );
  }

  public getCartWithProducts$(): Observable<CartViewModel> {
    const cart$ = this.getCart$();
    const cartProducts$ = cart$.pipe(
      mergeMap((cart) =>
        this.productsService.getProducts$(cart?.products?.map((p) => p.id))
      )
    );

    return combineLatest([cart$, cartProducts$]).pipe(
      map(([cart, cartProducts]) => {
        let productsVM = cart?.products?.map(
          (c) =>
            ({
              quantity: c.quantity,
              product: cartProducts.find((cp) => cp.id === c.id),
            } as ProductViewModel)
        );
        return { id: cart.id, productsVM: productsVM } as CartViewModel;
      })
    );
  }

  public addProductToCart(productId: number) {
    this.store.dispatch(addProductToCart({ productId: productId }));
  }

  private getCart$(): Observable<Cart> {
    return this.store.pipe(select(selectCartState));
  }
}
