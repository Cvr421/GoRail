import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css"
import Navbar from './Navbar';
function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/signup', {
        username,
        password,
      });
      navigate('/login')
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
   <Navbar/>
<div className="signup-container">
  <h2>Sign Up</h2>
  <form onSubmit={handleSubmit} className="signup-form">
    <div>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
    </div>
    <div>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <button type="submit">Sign Up</button>
    <button href="/login">Login</button>
    {/* <>Already SignUp</><a href="/login">Login</a> */}
  </form>
</div>

</>
  );
}

export default Signup;
