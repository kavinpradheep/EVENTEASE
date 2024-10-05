import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { auth, googleProvider } from '../../firebase-config'; 
import { signInWithPopup } from 'firebase/auth'; 

const Login = () => {
  //navigation
  const navigate = useNavigate();
  const handlebuttonclick = () =>{
    navigate('/Mainpage') //navigate to main page
  }

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handle form submission (sign-up with email and password)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Sending data to backend
    handlebuttonclick(); // redirct to main page of storage
    
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

  // Google Sign-In function
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User logged in with Google: ', user);
      // You can handle the user data here, for example, send it to your backend for further processing
    } catch (error) {
      console.error('Error during Google sign-in: ', error);
    }
  };

  return (
    <div className='login-page'>
      <div className="left-photo">
        <img src="/asserts/loginSvg.png" alt="Login illustration" height={638} width={530} />
      </div>
      
      <div className="login-right-section">
        <h1>Create an Account</h1>
        <p>Already have an account? <span>Log in</span></p>
        
        <form onSubmit={handleSubmit}>
          <div className="name">
            <input type="text" className="first-name" name="firstName" placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
            />
            <input type="text" className="last-name" name="lastName" placeholder="Last name" value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <input type="email" className="email" name="email" placeholder="Email" value={form.email}
            onChange={handleChange}
          />
          <input type="password" className="password" name="password" placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
          
          <button type="submit" className="create-account" >
            Create account
          </button>
        </form>

        <div className="or-register">
          <hr />
          <p>Or register with</p>
          <hr />
        </div>

        /* Google Sign-In Button */
        <button onClick={googleSignIn} className="google-btn">
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;