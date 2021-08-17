import { createAction, props, union } from '@ngrx/store';
import { Product } from '../../models/product';

export enum ProductsTypes {
  LoadProductsSuccess = '[Product Grid] Load Products Success',
  LoadProductsForCartSuccess = '[Cart] Load Products Success',
  EditProduct = '[Admin Edit Product] Edit Product',
  EditProductSuccess = '[Admin Edit Product ] Edit Product Success',
  EditProductFail = '[Admin Edit Product ] Edit Product Fail',
  AddProduct = '[Admin Add Product] Add Product',
  AddProductSuccess = '[Admin Add Product ] Add Product Success',

  DeleteProduct = '[Product Grid Delete] Delete Product',
  DeleteProductSuccess = '[Product Grid Delete] Delete Product Success',
  DeleteProductFail = '[Product Grid Delete] Delete Product Fail',
}

export const loadProductsSuccess = createAction(
  ProductsTypes.LoadProductsSuccess,
  props<{ products: Product[] }>()
);

export const loadProductsForCartSuccess = createAction(
  ProductsTypes.LoadProductsForCartSuccess,
  props<{ products: Product[] }>()
);

export const editProduct = createAction(
  ProductsTypes.EditProduct,
  props<{ product: Product }>()
);

export const editProductSuccess = createAction(
  ProductsTypes.EditProductSuccess,
  props<{ product: Product }>()
);

export const editProductFail = createAction(
  ProductsTypes.EditProductFail,
  props<{ product: Product }>()
);

export const addProduct = createAction(
  ProductsTypes.AddProduct,
  props<{ product: Product }>()
);

export const addProductSuccess = createAction(
  ProductsTypes.AddProductSuccess,
  props<{ product: Product }>()
);

export const deleteProduct = createAction(
  ProductsTypes.DeleteProduct,
  props<{ productId: number }>()
);

export const deleteProductSuccess = createAction(
  ProductsTypes.DeleteProductSuccess,
  props<{ productId: number }>()
);

export const deleteProductFail = createAction(
  ProductsTypes.DeleteProductFail,
  props<{ productId: number }>()
);

const all = union({
  loadProductsSuccess,
  loadProductsForCartSuccess,
  editProduct,
  editProductSuccess,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFail,
});

export type ProductsActions = typeof all;
