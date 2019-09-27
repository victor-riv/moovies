import { FormSubmitted, LoginEventType } from '../types';
import { LoginForm } from '../models';

export const formSubmitted = (payload: LoginForm): FormSubmitted => ({
  type: LoginEventType.FormSubmitted,
  payload
});
