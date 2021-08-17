import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config/app-config-service';
import { Cart } from '../../../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartsHttpService {
  private readonly collectionName: string = 'carts';

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {}

  public getSingleCart(id: number): Observable<Cart> {
    return this.httpClient.get<Cart>(
      this.appConfigService.apiBaseUrl + this.collectionName + `/` + id
    );
  }

  public addProductToCart(cart: Cart) {
    return this.httpClient.put<Cart>(
      this.appConfigService.apiBaseUrl + this.collectionName + `/` + cart.id,
      cart
    );
  }
}
