import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import { useNavigate } from 'react-router-dom'; // If you are using react-router for navigation

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('/api/login', { email, password });
      if (response.status === 200) {
        // Redirect to the next page upon successful login
        navigate('/Mainpage'); // Adjust this to your desired route
      }
    } catch (error) {
      alert('Login failed: ' + error.response.data);
    }
  };

  return (
    <div className='login-page'>
      <div className="left-photo">
        <img src="/asserts/loginSvg.png" alt="Login illustration" height={638} width={530} />
      </div>
      
      <div className="login-right-section">
        <h1>Admin Login</h1>
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            className="email" 
            name="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            className="password" 
            name="password" 
            placeholder="Enter your password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button type="submit" className="create-account" >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
