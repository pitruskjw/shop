import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppConfigService } from '../../../app-config/app-config-service';
import { User } from '../../../models/user';
import { UserRole } from '../../../models/user-role.enum';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  private readonly collectionName: string = 'users';

  constructor(
    private appConfigService: AppConfigService,
    private httpClient: HttpClient
  ) {}

  public getSingleUser$(id: number): Observable<User> {
    return this.httpClient.get<User>(
      this.appConfigService.apiBaseUrl + this.collectionName + `/` + id
    );
  }
}
