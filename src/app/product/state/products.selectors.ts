import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productsFeatureKey, ProductsState } from './products.reducer';

const getProductsState =
  createFeatureSelector<ProductsState>(productsFeatureKey);

const selectAllProducts = createSelector(
  getProductsState,
  (productsState) => productsState.products
);

export const getUnloadedProductsId = (productsId: number[]) =>
  createSelector(selectAllProducts, (allProducts) => {
    return (
      productsId?.filter((p) => !allProducts.some((ap) => ap.id === p)) || []
    );
  });

export const getProducts = (productsId: number[]) =>
  createSelector(selectAllProducts, (allProducts) => {
    return (
      allProducts.filter((ap) => productsId?.some((p) => p === ap.id)) || []
    );
  });
