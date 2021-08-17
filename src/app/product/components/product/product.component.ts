import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input()
  public singleProduct: Product;

  @Input()
  public isUserLoggedIn: boolean;

  @Input()
  public isAdminLoggedIn: boolean;

  @Output()
  addToCartClick = new EventEmitter<number>();

  @Output()
  deleteProductClick = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  public addToCart(productId: number) {
    this.addToCartClick.emit(productId);
  }

  public deleteProduct(productId: number) {
    this.deleteProductClick.emit(productId);
  }
}
