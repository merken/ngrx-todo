import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  private configuration: any;

  constructor(private injector: Injector) { }

  public get config() {
    if (!this.configuration) {
      return null;
    }

    return this.configuration;
  }

  public loadEnvironmentConfig(): Promise<boolean> {
    return Observable.create(observer => {
      const http = this.injector.get(HttpClient);
      http.get('./environment.json').pipe(
        catchError((error: any): any => {
          observer.next(false);
          observer.complete();
        })).subscribe((env: any) => {
          this.setupConfig(env);
          observer.next(true);
          observer.complete();
        });
    }).toPromise();
  }

  private setupConfig(config: any): void {
    const initialConfiguration = {
      api_host: config.api_host,
      hub_host: config.hub_host
    };

    this.configuration = initialConfiguration;
  }

}
