import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../user/services/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class AdminLoadGuard implements CanLoad {
  constructor(private usersService: UsersService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.usersService
      .isAdminLoggedIn$()
      .pipe(
        map(
          (isAdminUserLoggedIn) =>
            isAdminUserLoggedIn || this.router.createUrlTree([''])
        )
      );
  }
}
