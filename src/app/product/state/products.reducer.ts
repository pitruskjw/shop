import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product';
import {
  addProductSuccess,
  deleteProductSuccess,
  editProductSuccess,
  loadProductsForCartSuccess,
  loadProductsSuccess,
  ProductsActions,
} from './products.actions';

export interface ProductsState {
  products: Product[];
}

export const productsInitialState: ProductsState = { products: [] };

const reducer = createReducer(
  productsInitialState,

  on(loadProductsSuccess, loadProductsForCartSuccess, (state, action) => {
    let newProducts = (action.products as Product[]).filter(
      (p) => !state.products?.some((x) => x?.id === p.id)
    );

    newProducts.push(...state.products);

    return { ...state, products: newProducts };
  }),

  on(editProductSuccess, (state, action) => {
    let productsCopy = [...state.products];
    const productIndex = productsCopy.findIndex(
      (x) => x.id === action.product.id
    );
    if (productIndex >= 0) {
      productsCopy[productIndex] = action.product;
    } else {
      productsCopy.push(action.product);
    }
    return { ...state, products: productsCopy };
  }),

  on(addProductSuccess, (state, action) => {
    let productsCopy = [...state.products];
    productsCopy.push(action.product);
    return { ...state, products: productsCopy };
  }),
  on(deleteProductSuccess, (state, action) => {
    let productsCopy = state.products.filter((x) => x.id != action.productId);
    return { ...state, products: productsCopy };
  })
);

export function productsReducer(
  state: ProductsState = productsInitialState,
  action: ProductsActions
): ProductsState {
  return reducer(state, action);
}

export const productsFeatureKey = 'products';
