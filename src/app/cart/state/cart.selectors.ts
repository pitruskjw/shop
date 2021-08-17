import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cartFeatureKey, CartState } from './cart.reducer';

const getCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCartState = createSelector(
  getCartState,
  (cartState) => cartState.cart
);
