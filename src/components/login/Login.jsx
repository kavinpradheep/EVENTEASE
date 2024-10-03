import React from 'react';
import './login.css';

const Login = () => {
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
        </div>
    </div>
  )
}

export default Login;
