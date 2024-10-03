import React, { useState } from 'react';
import './login.css';
import { storeUserDetails } from './login.js'; // Import the storage function
import login_img from '../../../public/asserts/loginSvg.png';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    storeUserDetails(firstName, lastName, email, password);
  };

  return (
    <div className='login-page'>
      <div className="left-photo">
      </div>
      <div className="right-section">
        <h1>Create an Account</h1>
        <p>Already have an account? <span>Log in</span></p>
        
        <form onSubmit={handleFormSubmit}>
          <div className="name">
            <input type='text' className="first-name" placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input type='text' className="last-name" placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input type="email" className='email' placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password" className='password' placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="create-account" type="submit">
            Create account
          </button>
        </form>

        <div className="or-register">
          <hr />
          <p>Or register with</p>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Login;
