import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/user';
import { UserRole } from '../../models/user-role.enum';
import { usersFeatureKey, UsersState } from './users.reducer';

const getUserState = createFeatureSelector<UsersState>(usersFeatureKey);

export const selectUserState = createSelector(
  getUserState,
  (userState) => userState.user || ({} as User)
);

export const isAdminUserLoggedIn = createSelector(
  getUserState,
  (userState) => userState?.user?.role === UserRole.ADMIN
);

export const isCustomerUserLoggedIn = createSelector(
  getUserState,
  (userState) => userState?.user?.role === UserRole.CUSTOMER
);
