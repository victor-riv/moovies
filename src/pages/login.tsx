import React, { useReducer, FC } from 'react';

import '../styles/login.scss';
import { LoginForm } from '../components';

interface Props {}

const LoginPage: FC<Props> = () => {
  return (
    <div className='login-page'>
      <div className='login-card'>
        <div className='login-left' />
        <div className='login-right'>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
