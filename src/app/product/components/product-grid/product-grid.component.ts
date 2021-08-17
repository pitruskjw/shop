import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  takeUntil,
} from 'rxjs/operators';
import { CartsService } from '../../../cart/services/carts/carts.service';
import { Product } from '../../../models/product';
import { BaseComponent } from '../../../shared/base.component';
import { UsersService } from '../../../user/services/users/users.service';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent extends BaseComponent implements OnInit {
  public searchInput = new FormControl();
  public gridFormattedProducts$: Observable<Product[][]>;
  public isCustomerLogin$: Observable<boolean>;
  public isAdminLogin$: Observable<boolean>;

  private pageNumber: number = 1;
  private searchProductNameSubject: BehaviorSubject<string> =
    new BehaviorSubject('');
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject(
    this.pageNumber
  );
  private pageLimitSubject: BehaviorSubject<number> = new BehaviorSubject(9);

  constructor(
    private productsService: ProductsService,
    private usersService: UsersService,
    private cartService: CartsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.gridFormattedProducts$ = combineLatest([
      this.pageLimitSubject,
      this.pageSubject,
      this.searchProductNameSubject,
    ]).pipe(
      mergeMap(([pageLimit, page, x]) =>
        this.productsService
          .getAndStore$({
            _limit: pageLimit,
            _page: page,
            q: x,
          })
          .pipe(map(this.generate2DimensionsArray))
      )
    );

    this.isAdminLogin$ = this.usersService.isAdminLoggedIn$();
    this.isCustomerLogin$ = this.usersService.isCustomerLoggedIn$();

    this.searchInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroyer$),
        map((x) => {
          return this.searchProductNameSubject.next(x);
        })
      )
      .subscribe();
  }

  public addToCart(productId: number) {
    this.cartService.addProductToCart(productId);
  }

  public deleteProduct(productId: number) {
    this.productsService.deleteProduct(productId);
  }

  public pageUp(): void {
    this.pageNumber++;
    this.pageSubject.next(this.pageNumber);
  }

  public pageDown(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.pageSubject.next(this.pageNumber);
    }
  }

  private generate2DimensionsArray(products: Product[]) {
    let productsToSort = [...products];
    const newArr = [];
    while (productsToSort.length) {
      let toAdd = productsToSort.splice(0, 3);
      newArr.push(toAdd);
    }
    return newArr;
  }
}
