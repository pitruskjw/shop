import { Component, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { concatMap, switchMap, takeUntil } from 'rxjs/operators';
import { CartViewModel } from '../../../models/cartViewModel';
import { ProductsService } from '../../../product/services/products/products.service';
import { BaseComponent } from '../../../shared/base.component';
import { CartsService } from '../../services/carts/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent extends BaseComponent implements OnInit {
  public cartViewModel$: Observable<CartViewModel>;
  constructor(private cartService: CartsService) {
    super();
  }

  ngOnInit(): void {
    this.cartService
      .fetchAndStoreCartProducts$()
      .pipe(takeUntil(this.destroyer$))
      .subscribe();

    this.cartViewModel$ = this.cartService.getCartWithProducts$();
  }
}
