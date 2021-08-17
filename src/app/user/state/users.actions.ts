import { createAction, props, union } from '@ngrx/store';
import { User } from '../../models/user';

export enum UsersTypes {
  LoginAdmin = '[Login Admin] Login Admin',
  LoginAdminSuccess = '[Login Admin] Login Admin Success',
  LoginAdminFail = '[Login Admin] Login Admin Fail',

  LoginCustomer = '[Login Customer] Login Customer',
  LoginCustomerSuccess = '[Login Customer] Login Customer Success',
  LoginCustomerFail = '[Login Customer] Login Customer Fail',

  Logout = '[Logout] Logout',
}

export const loginAdmin = createAction(UsersTypes.LoginAdmin);
export const loginCustomer = createAction(UsersTypes.LoginCustomer);
export const logout = createAction(UsersTypes.Logout);
export const loginAdminSuccess = createAction(
  UsersTypes.LoginAdminSuccess,
  props<{ user: User }>()
);
export const loginAdminFail = createAction(UsersTypes.LoginAdminSuccess);

export const loginCustomerSuccess = createAction(
  UsersTypes.LoginCustomerSuccess,
  props<{ user: User }>()
);
export const loginCustomerFail = createAction(UsersTypes.LoginCustomerFail);

const all = union({
  loginAdmin,
  loginAdminSuccess,
  loginAdminFail,
  logout,
  loginCustomer,
  loginCustomerSuccess,
  loginCustomerFail,
});

export type UsersActions = typeof all;
