import React from 'react';
import './Login.css';
import img from '../../assets/undraw-upload-re-pasx@2x.png';
import { LoginForm } from '../../components';

const Login = () => {
  return (
    <div className="login">
      <div className="left-container">
        <div className="login-text">
          <h1>Design APIs fast,</h1>
          <h1>Manage content easily.</h1>
        </div>
        <div className="login-img">
          <img src={img} alt="login-img" />
        </div>
      </div>
      <div className="right-container">
        <h1>Login to your CMS+ account</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
