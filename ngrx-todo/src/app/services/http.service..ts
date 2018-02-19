import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import {environment } from '../../environments/environment';

@Injectable()
export class HttpService {
    private configuration: any;

    constructor(
        private http: HttpClient
    ) { }

    public makeRequest(method, path, options: any = {}) {
        if (options.body) {
            options.body = JSON.stringify(options.body);
        }

        return this.http
            .request(method, `${environment.api_host}${path}`, options)
            .pipe(
                map(resp => resp || []),
                catchError(errResp => Observable.throw(errResp.error)));
    }
}
