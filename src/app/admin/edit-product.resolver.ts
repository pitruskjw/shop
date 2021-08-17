import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductsService } from '../product/services/products/products.service';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    return this.productsService.getSingleProduct$(route.params?.id).pipe(
      catchError(() => {
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
