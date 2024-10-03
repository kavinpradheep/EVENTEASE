// src/components/login.jsx

import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sending data to backend
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Account created successfully!');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred during registration.');
    }
  };

  return (
    <div className='login-page'>
      <div className="left-photo">
        <img src="/asserts/loginSvg.png" alt="Login illustration" height={638} width={530} />
      </div>
      
      <div className="right-section">
        <h1>Create an Account</h1>
        <p>Already have an account? <span>Log in</span></p>
        
        <form onSubmit={handleSubmit}>
          <div className="name">
            <input
              type="text"
              className="first-name"
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
              aria-label="First name"
            />
            <input
              type="text"
              className="last-name"
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
              aria-label="Last name"
            />
          </div>

          <input
            type="email"
            className="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            aria-label="Email"
          />
          <input
            type="password"
            className="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            aria-label="Password"
          />
          
          <button type="submit" className="create-account">
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
