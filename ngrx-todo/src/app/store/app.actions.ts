import { Action } from '@ngrx/store';

export const CONNECTION_ESTABLISHED = '[App] Connection Established';
export const SUBSCRIPTION_COMPLETED = '[App] Subscription Completed';
export const MESSAGE_RECEIVED = '[App] Message Received';
export const REQUEST_DISPATCHED = '[App] Request Dispatched';

export class ConnectionEstablished implements Action {
    readonly type = CONNECTION_ESTABLISHED;
}

export class SubscriptionCompleted implements Action {
    readonly type = SUBSCRIPTION_COMPLETED;
}

export class MessageReceived implements Action {
    readonly type = MESSAGE_RECEIVED;
    constructor(public messageType, public payload: any) { }
}

export class RequestDispatched implements Action {
    readonly type = REQUEST_DISPATCHED;
}

export type Actions =
    | ConnectionEstablished
    | SubscriptionCompleted
    | MessageReceived
    | RequestDispatched;
