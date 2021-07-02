import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import image from './bee_path_7.png';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <>
      <div>
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </button>
        </center>
      </div>
      <img className="image2" src={image}  />           
    </>
  );
}

export default LoginPage;
