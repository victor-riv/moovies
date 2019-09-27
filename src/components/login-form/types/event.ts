import { Event } from '../../../shared/types/event';
import { LoginEventType } from './event-type';
import { LoginForm } from '../models/login-form';

interface LoginEvent extends Event<LoginEventType> {
  type: LoginEventType;
}

export interface FormSubmitted extends LoginEvent {
  readonly type: LoginEventType.FormSubmitted;
  payload: LoginForm;
}

export type LoginEvents = FormSubmitted;
