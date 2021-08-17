export type User = {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: string;
  avatar: string;
  email: string;
  address: {
    country: string;
    city: string;
    zip: string;
    street: string;
  };
  orders: {
    id: number;
    products: {
      id: number;
      quantity: number;
    }[];
  };
  role: 'ADMIN' | 'CUSTOMER'; // Role is based on i % 2
};
