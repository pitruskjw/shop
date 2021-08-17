import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../product/services/products/products.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  public saveProduct(product: Product) {
    this.productsService.addProduct(product);
  }
}
