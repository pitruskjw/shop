import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../models/cart';
import {
  addProductToCart,
  addProductToCartFail,
  CartActions,
  loadCartSuccess,
  unloadCart,
} from './cart.actions';

export interface CartState {
  cart: Cart;
}

export const cartInitialState: CartState = { cart: {} as Cart };

const reducer = createReducer(
  cartInitialState,

  on(loadCartSuccess, (state, action) => ({ ...state, cart: action.cart })),

  on(addProductToCart, (state, action) => {
    let newCartState: Cart;
    const cart = state.cart as Cart;
    let cartProducts = [...state.cart.products];
    let productIndex = cartProducts.findIndex((x) => x.id === action.productId);
    if (productIndex >= 0) {
      let newProduct = { ...cartProducts[productIndex] };
      newProduct.quantity = cartProducts[productIndex].quantity + 1;
      cartProducts[productIndex] = newProduct;
    } else {
      cartProducts.push({ id: action.productId, quantity: 1 });
    }
    newCartState = { ...cart, products: cartProducts };
    return { ...state, cart: newCartState };
  }),

  on(addProductToCartFail, (state, action) => {
    let newCartState: Cart;
    const cart = state.cart as Cart;
    let cartProducts = [...state.cart.products];
    let productIndex = cartProducts.findIndex((x) => x.id === action.productId);
    if (productIndex >= 0 && cartProducts[productIndex].quantity > 1) {
      let newProduct = { ...cartProducts[productIndex] };
      newProduct.quantity = cartProducts[productIndex].quantity - 1;
      cartProducts[productIndex] = newProduct;
    } else if (productIndex >= 0) {
      cartProducts.splice(productIndex, 1);
    }
    newCartState = { ...cart, products: cartProducts };
    return { ...state, cart: newCartState };
  }),

  on(unloadCart, (state, action) => ({ ...state, cart: {} as Cart }))
);

export function cartReducer(
  state: CartState = cartInitialState,
  action: CartActions
): CartState {
  return reducer(state, action);
}

export const cartFeatureKey = 'cart';
