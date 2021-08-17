import { createAction, props, union } from '@ngrx/store';
import { Cart } from '../../models/cart';
import { User } from '../../models/user';

export enum CartTypes {
  LoadCart = '[Load Cart] Load Cart',
  LoadCartSuccess = '[Load Cart] Load Cart Success',
  LoadCartFail = '[Load Cart] Load Cart Fail',

  AddProductToCart = '[Product Grid] Add To Cart',
  AddProductToCartSuccess = '[Product Grid] Add To Cart Success',
  AddProductToCartFail = '[Product Grid] Add To Cart Fail',

  UnloadCart = '[UnloadCart] UnloadCart',
}

export const loadCart = createAction(CartTypes.LoadCart);
export const unloadCart = createAction(CartTypes.UnloadCart);

export const loadCartSuccess = createAction(
  CartTypes.LoadCartSuccess,
  props<{ cart: Cart }>()
);

export const loadCartFail = createAction(CartTypes.LoadCartFail);

export const addProductToCart = createAction(
  CartTypes.AddProductToCart,
  props<{ productId: number }>()
);

export const addProductToCartSuccess = createAction(
  CartTypes.AddProductToCartSuccess,
  props<{ productId: number }>()
);

export const addProductToCartFail = createAction(
  CartTypes.AddProductToCartFail,
  props<{ productId: number }>()
);

const all = union({
  loadCart,
  loadCartSuccess,
  loadCartFail,
  addProductToCart,
  unloadCart,
});

export type CartActions = typeof all;
