import { Product } from './product';

export type ProductViewModel = {
  product: Product;
  quantity: number;
};

export type CartViewModel = {
  id: number; // User id
  productsVM: ProductViewModel[];
};
