import React from 'react';
import './login.css';
// If using Firebase for authentication
import { auth, provider } from '../../firebase-config'; // Import Firebase config
import { signInWithPopup } from 'firebase/auth'; // Firebase auth methods

const Login = () => {

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // You can retrieve user info here and save it in your app's state or context
      console.log(result.user);
    } catch (error) {
      console.error("Google Sign-In Error", error);
    }
  };

  return (
    <div className='login-page'>
      <div className="left-photo">
        {/* Use relative path for images in the public folder */}
        <img src="/asserts/loginSvg.png" alt="Login illustration"  height={638} width={530}/>
      </div>
      
      <div className="right-section">
        <h1>Create an Account</h1>
        <p>Already have an account? <span>Log in</span></p>
        <div className="name">
          <input type='text' className="first-name" placeholder='First name' aria-label="First name"/>
          <input type='text' className="last-name" placeholder='Last name' aria-label="Last name"/>
        </div>

        <input type="email" className='email' placeholder='Email' aria-label="Email"/>
        <input type="password" className='password' placeholder='Enter your password' aria-label="Password"/>
        <button className="create-account">
          Create account
        </button>

        <div className="or-register">
          <hr />
          <p>Or register with</p>
          <hr />
        </div>

        {/* Add Google Sign-In Button here */}
        <button onClick={handleGoogleSignIn} className="google-login-button">
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
