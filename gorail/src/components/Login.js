import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "./Login.css"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      
        
      });
      if(response.data.statusText === 'Success'){
        toast.success("Login Successfully")
      }else{
        toast.error(response.data.message)
      }
      
    navigate('/home')
      // console.log(response.data);
      // navigate('/home')
    } catch (error) {
   //   console.error(error);
   toast.error("Something went wrong");
    }
  };
  
 
 



  return (
    <>
    <Navbar/>
    <div className="login-container">
      <ToastContainer/>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
}

export default Login;
