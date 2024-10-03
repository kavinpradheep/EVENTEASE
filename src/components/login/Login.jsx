import React from 'react'
import './login.css'

const Login = () => {
  return (
    <div className='login-page'>
        
        <div className="left-photo">
            <img src="" alt="" />
        </div>
        <div className="right-section">
            <h1>Create an Account</h1>
            <p>Already have an account? <span>Log in</span></p>
            <div className="name">
                <input type='text' className="first-name" placeholder='First name'/>
                <input type='text' className="last-name" placeholder='Last name' />
            </div>

            <input type="mail" className='email' placeholder='Email'/>
            <input type="password" className='password'  placeholder='Enter your password'/>
            <button className="create-account">
                Create accoount
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

export default Login