import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: AppConfig;

  constructor(private http: HttpClient) {}
  public load(): Promise<void> {
    const jsonFile = `../../assets/appconfig.json`;

    return this.http
      .get<AppConfig>(jsonFile)
      .toPromise()
      .then((config) => {
        this.appConfig = config;
      });
  }

  get apiBaseUrl(): string {
    return this.appConfig.baseUrl;
  }
}
