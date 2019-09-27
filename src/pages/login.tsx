import React, { useReducer } from "react";
import "../styles/login.scss";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left" />
        <div className="login-right">
          <form className="login-form-container">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
            <button> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
