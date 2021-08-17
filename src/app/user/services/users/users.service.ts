import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { unloadCart } from '../../../cart/state/cart.actions';
import { User } from '../../../models/user';
import {
  isAdminUserLoggedIn,
  isCustomerUserLoggedIn,
  selectUserState,
} from '../../state/user.selectors';
import { loginAdmin, loginCustomer, logout } from '../../state/users.actions';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private store: Store) {}

  public loginAdmin(): void {
    this.store.dispatch(loginAdmin());
  }

  public loginCustomer(): void {
    this.store.dispatch(loginCustomer());
  }

  public logout(): void {
    this.store.dispatch(unloadCart());
    this.store.dispatch(logout());
  }

  public isAdminLoggedIn$(): Observable<boolean> {
    return this.store.pipe(select(isAdminUserLoggedIn));
  }

  public isCustomerLoggedIn$(): Observable<boolean> {
    return this.store.pipe(select(isCustomerUserLoggedIn));
  }
}
