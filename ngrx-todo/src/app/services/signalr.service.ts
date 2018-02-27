import { Injectable } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Todo } from '../models';

export type TodoCallback = (msg: any) => any;

@Injectable()
export class SignalRService {
    private hubConnection: HubConnection;
    private _isInitialized: boolean;

    constructor() {
        this.hubConnection = new HubConnection(`${environment.hub_host}/todo`);
    }

    public get isInitialized(): boolean {
        return this._isInitialized;
    }

    public initializeConnection(): Observable<boolean> {
        return Observable.create(observer => {
            this.hubConnection
                .start()
                .then(() => {
                    this._isInitialized = true;
                    observer.next(true);
                    observer.complete();
                })
                .catch(err => {
                    observer.next(true);
                    observer.complete();
                });
        });
    }

    public subscribe(event: string, handler: TodoCallback) {
        this.hubConnection.on(`${event}`, (msg: any) => {
            handler(msg);
        });
    }

    public publish(event: string, msg: any) {
        this.hubConnection.invoke(`${event}`, msg);
    }
}
