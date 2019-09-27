import { Subscription } from '../../../../services/subscription-service';
import { Status, EventType, EffectType } from '../types';
import { Effect } from '../models';
import { SubscriptionEvent } from './events';

export interface SubscriptionsState {
  status: Status;
  effect: Effect;
  subscription: Subscription;
  subscriptions: Subscription[];
  error: Error;
}

export const initialState: SubscriptionsState = {
  status: Status.Idling,
  effect: undefined,
  subscriptions: [],
  subscription: undefined,
  error: undefined
};

export const reducer = (
  state: SubscriptionsState,
  event: SubscriptionEvent
): SubscriptionsState => {
  switch (state.status) {
    case Status.Initializing:
      switch (event.type) {
        case EventType.FetchSucceeded:
          return {
            ...state,
            status: Status.IdlingAfterSuccess,
            effect: null,
            subscriptions: event.subscriptions
          };
        case EventType.FetchFailed:
          return {
            ...state,
            status: Status.IdlingAfterFailure,
            effect: null,
            error: event.error
          };
      }
    case Status.Confirming:
      switch (event.type) {
        case EventType.UnsubscribeRequestConfirmed:
          return {
            ...state,
            status: Status.Loading,
            effect: { type: EffectType.UnsubscribeItem },
            subscription: event.subscription
          };
        case EventType.UnsubscribeRequestDenied:
          return { ...state, status: Status.Idling };
      }
    case Status.Loading:
      switch (event.type) {
        case EventType.FetchSucceeded:
          return {
            ...state,
            status: Status.IdlingAfterSuccess,
            effect: null,
            subscriptions: event.subscriptions
          };
        case EventType.FetchFailed:
          return {
            ...state,
            status: Status.IdlingAfterFailure,
            effect: null,
            error: event.error
          };
        case EventType.SubscribeSucceeded:
          return {
            ...state,
            status: Status.IdlingAfterSuccess,
            effect: null,
            subscription: null,
            subscriptions: state.subscriptions.map(subscription =>
              subscription.itemId === event.subscription.itemId
                ? event.subscription
                : subscription
            )
          };
        case EventType.SubscribeFailed:
          return {
            ...state,
            status: Status.IdlingAfterFailure,
            effect: { type: EffectType.AlertSubscribeFailed },
            subscription: null,
            error: event.error
          };
        case EventType.UnsubscribeSucceeded:
          return {
            ...state,
            status: Status.IdlingAfterSuccess,
            effect: null,
            subscription: null,
            subscriptions: state.subscriptions.map(subscription =>
              subscription.itemId === event.subscription.itemId
                ? event.subscription
                : subscription
            )
          };
        case EventType.UnsubscribeFailed:
          return {
            ...state,
            status: Status.IdlingAfterFailure,
            effect: { type: EffectType.AlertUnsubscribeFailed },
            subscription: null,
            error: event.error
          };
      }
    case Status.Idling:
      switch (event.type) {
        case EventType.FetchRequested:
          return {
            ...state,
            status: Status.Initializing,
            effect: { type: EffectType.FetchInitialData }
          };
      }
    case Status.IdlingAfterSuccess:
    case Status.IdlingAfterFailure:
      switch (event.type) {
        case EventType.SubscribeRequested:
          return {
            ...state,
            status: Status.Loading,
            effect: { type: EffectType.SubscribeItem },
            subscription: event.subscription
          };
        case EventType.UnsubscribeRequested:
          return {
            ...state,
            status: Status.Confirming,
            subscription: event.subscription
          };
        case EventType.ShutDownRequested:
          return {
            ...initialState,
            status: Status.ShuttingDown
          };
      }
    default:
      return state;
  }
};
