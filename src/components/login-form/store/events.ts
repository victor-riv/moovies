import { Subscription } from '../../../../services/subscription-service';
import { EventType } from '../types';

export interface SubscriptionEvent {
  type: EventType;
  subscription?: Subscription;
  subscriptions?: Subscription[];
  error?: Error;
}
