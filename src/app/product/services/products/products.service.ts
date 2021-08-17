import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, concat, EMPTY, merge, Observable } from 'rxjs';
import {
  concatAll,
  concatMap,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Product } from '../../../models/product';
import {
  addProduct,
  deleteProduct,
  editProduct,
  loadProductsForCartSuccess,
  loadProductsSuccess,
} from '../../state/products.actions';
import {
  getProducts,
  getUnloadedProductsId,
} from '../../state/products.selectors';
import { ProductsHttpService } from '../products-http/products-http.service';
import { ProductsQueryParams } from '../products-http/products-query-params';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private productsHttpService: ProductsHttpService,
    private store: Store
  ) {}

  public getAndStore$(
    queryParams?: ProductsQueryParams
  ): Observable<Product[]> {
    return this.productsHttpService
      .getProducts$(queryParams)
      .pipe(
        tap((x) => this.store.dispatch(loadProductsSuccess({ products: x })))
      );
  }
  public provideAndStoreProducts$(productsId: number[]): Observable<void> {
    return this.provideProducts$(productsId).pipe(
      map((x) => {
        this.store.dispatch(loadProductsForCartSuccess({ products: x }));
      })
    );
  }

  public getSingleProduct$(productId: number): Observable<Product> {
    return this.productsHttpService.getSingleProduct(productId);
  }

  public getProducts$(productsId: number[]): Observable<Product[]> {
    return this.store.pipe(select(getProducts(productsId)));
  }

  private provideProducts$(productsId: number[]): Observable<Product[]> {
    return this.getProductsIdToLoad$(productsId).pipe(
      concatMap((toLoadProductsId: number[]) => {
        if (toLoadProductsId.length > 0) {
          let requests: Observable<Product>[] = [];
          toLoadProductsId.forEach((id) =>
            requests.push(this.productsHttpService.getSingleProduct(id))
          );
          return combineLatest(requests);
        } else {
          return EMPTY;
        }
      })
    );
  }

  public editProduct(product: Product) {
    this.store.dispatch(editProduct({ product: product }));
  }

  public addProduct(product: Product) {
    product.defaultImage = 'http://placeimg.com/640/480/cats';
    this.store.dispatch(addProduct({ product: product }));
  }

  public deleteProduct(productId: number) {
    this.store.dispatch(deleteProduct({ productId: productId }));
  }

  private getProductsIdToLoad$(productsId: number[]): Observable<number[]> {
    return this.store.pipe(select(getUnloadedProductsId(productsId)));
  }
}
