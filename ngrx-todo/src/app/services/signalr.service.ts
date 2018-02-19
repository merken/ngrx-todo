import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class SignalRService {
    private hubConnection: HubConnection;

    constructor() {
        this.hubConnection = new HubConnection(`${environment.hub_host}/todo`);
    }

    public initializeConnection(): Observable<boolean> {
        return Observable.create(observer => {
            this.hubConnection
                .start()
                .then(() => {
                    observer.next(true);
                    observer.complete();
                })
                .catch(err => {
                    observer.next(true);
                    observer.complete();
                });
        })
    }

    public subscribe(event: string): Observable<any> {
        return Observable.create(observer => {
            this.hubConnection.on(`${event}`, (msg: any) => {
                observer.next(msg);
            })
        });
    }

    public publish(event: string, msg: any) {
        this.hubConnection.invoke(`${event}`, msg);
    }
}
