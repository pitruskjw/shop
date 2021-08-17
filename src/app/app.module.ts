import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppConfigService } from './app-config/app-config-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/components/cart/cart.component';
import { ProductGridComponent } from './product/components/product-grid/product-grid.component';
import { ProductComponent } from './product/components/product/product.component';
import { reducers, metaReducers } from './reducers';
import { usersFeatureKey, usersReducer } from './user/state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './user/state/user.effects';
import { CartEffects } from './cart/state/cart.effects';
import { cartFeatureKey, cartReducer } from './cart/state/cart.reducer';
import {
  productsFeatureKey,
  productsReducer,
} from './product/state/products.reducer';
import { SumPipe } from './cart/pipes/sum/sum.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductsEffects } from './product/state/products.effects';
@NgModule({
  declarations: [
    AppComponent,
    ProductGridComponent,
    ProductComponent,
    CartComponent,
    SumPipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(usersFeatureKey, usersReducer),
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    StoreModule.forFeature(productsFeatureKey, productsReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 100,
    }),
    EffectsModule.forRoot([UserEffects, CartEffects, ProductsEffects]),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => () =>
        appConfigService.load(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
