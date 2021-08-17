import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../../app-config/app-config-service';
import { Product } from '../../../models/product';

import { ProductsQueryParams } from './products-query-params';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpService {
  private readonly collectionName: string = 'products';

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {}

  public getProducts$(
    queryParams?: ProductsQueryParams
  ): Observable<Product[]> {
    var httpParams: Record<string, string> = {};
    if (queryParams) {
      for (var [k, v] of Object.entries(queryParams)) {
        if (v !== undefined) {
          httpParams[k] = v.toString();
        }
      }
    }

    return this.httpClient.get<Product[]>(
      this.appConfigService.apiBaseUrl + this.collectionName,
      { params: httpParams }
    );
  }

  public getSingleProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      this.appConfigService.apiBaseUrl + this.collectionName + `/` + id
    );
  }

  public updateProduct$(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      this.appConfigService.apiBaseUrl + this.collectionName + `/` + product.id,
      product
    );
  }

  public createProduct$(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(
      this.appConfigService.apiBaseUrl + this.collectionName,
      product
    );
  }

  public deleteProduct$(productId: number) {
    return this.httpClient.delete<Product>(
      this.appConfigService.apiBaseUrl + this.collectionName + `/` + productId
    );
  }
}
