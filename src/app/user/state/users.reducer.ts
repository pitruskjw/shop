import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user';
import {
  loginAdmin,
  loginAdminSuccess,
  loginCustomerSuccess,
  logout,
  UsersActions,
} from './users.actions';

export interface UsersState {
  user?: User;
}

export const usersInitialState: UsersState = { user: undefined };

const reducer = createReducer(
  usersInitialState,

  on(loginAdminSuccess, loginCustomerSuccess, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(logout, (state, action) => ({ ...state, user: undefined }))
);

export function usersReducer(
  state: UsersState = usersInitialState,
  action: UsersActions
): UsersState {
  return reducer(state, action);
}

export const usersFeatureKey = 'users';
