import { Status, Effect } from '../../../shared/types';
import { LoginForm } from '../models';
import { LoginEvents, LoginEventType, LoginEffectType } from '../types';

interface LoginState {
  status: Status;
  effect: Effect<LoginEffectType>;
  form: LoginForm;
  error: Error | undefined;
}

export const initialState: LoginState = {
  status: Status.Idling,
  effect: undefined,
  form: { email: undefined, password: undefined },
  error: undefined
};

export const reducer = (state: LoginState, event: LoginEvents): LoginState => {
  switch (state.status) {
    case Status.Loading:
      switch (event.type) {
        // case LoginEventType.FormSubmitted:
        //   return {
        //     ...state,
        //     status: Status.IdlingAfterFailure,
        //     effect: null,
        //     error: event.error
        //   };

        // case EventType.FormSubmitFailed:
        //   return {
        //     ...state,
        //     status: Status.IdlingAfterFailure,
        //     effect: null,
        //     error: event.error
        //   };

        default:
          return state;
      }
    case Status.Idling:
      switch (event.type) {
        case LoginEventType.FormSubmitted:
          return {
            ...state,
            form: event.payload,
            effect: {
              type: LoginEffectType.SubmitForm
            }
          };

        default:
          return state;
      }
    // eslint-disable-next-line no-fallthrough
    case Status.IdlingAfterSuccess:
    case Status.IdlingAfterFailure:
      switch (event.type) {
        // case LoginEventType.ShutDownRequested:
        //   return {
        //     ...initialState,
        //     status: Status.ShuttingDown
        //   };
        default:
          return state;
      }
    default:
      return state;
  }
};
