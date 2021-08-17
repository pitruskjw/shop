import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from './models/user';
import { UsersService } from './user/services/users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isCustomerLogin$: Observable<boolean>;
  public isAdminLogin$: Observable<boolean>;

  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.isAdminLogin$ = this.usersService.isAdminLoggedIn$();
    this.isCustomerLogin$ = this.usersService.isCustomerLoggedIn$();
  }
  title = 'frontend-starter';

  public loginAdmin(): void {
    this.usersService.loginAdmin();
  }

  public loginCustomer(): void {
    this.usersService.loginCustomer();
  }

  public logout(): void {
    this.usersService.logout();
  }
}
