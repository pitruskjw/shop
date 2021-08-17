import { Component, OnInit } from '@angular/core';
import { UsersService } from '../user/services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isAdminLogin$: any;
  isCustomerLogin$: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.isAdminLogin$ = this.usersService.isAdminLoggedIn$();
    this.isCustomerLogin$ = this.usersService.isCustomerLoggedIn$();
  }
}
