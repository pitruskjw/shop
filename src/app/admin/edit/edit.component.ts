import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductsService } from '../../product/services/products/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  public product$: Observable<Product>;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product$ = this.activatedRoute.data.pipe(map((data) => data?.product));
  }

  public saveProduct(product: Product) {
    this.productsService.editProduct(product);
  }
}
