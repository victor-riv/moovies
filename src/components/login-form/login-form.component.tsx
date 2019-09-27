import React, { useReducer, FC, useEffect } from 'react';
import { reducer, initialState } from './store';

import '../../styles/login.scss';
import { LoginEffectType } from './types';

interface Props {}

export const LoginForm: FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.effect) {
      return;
    }

    switch (state.effect.type) {
      case LoginEffectType.SubmitForm:
      // makeApiCall(state.form);
    }
  }, [state.effect]);

  return (
    <form className='login-form-container'>
      <label htmlFor='email'>Email</label>
      <input type='email' name='email' id='email' />
      <label htmlFor='password'>Password</label>
      <input type='password' name='password' id='password' />
      <button> Submit </button>
    </form>
  );
};
