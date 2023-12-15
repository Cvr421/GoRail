import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate ,} from 'react-router-dom';
import '../style.css';
import Navbar from './Navbar';
// import axios from 'axios';
import'./Home.css';
//mport axios from 'axios';
function Home() {
  // const navigate = useNavigate();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
 
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const url = 'http://localhost:3001/findusers';
  //       const options = {
  //         method: 'GET',
  //         url:url,
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`
  //         }
  //       };
  //       const response = await axios(options);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("something went wrong");
  //     }
  //   };
  
  //   fetchData();
  // });
  
  // console.log(isAuthenticated);

  // if (isLoading) {
    // Show loading spinner or skeleton screen
    // return <div>Loading...</div>;
  // }

  // if (isAuthenticated) {
  //   // User is not authenticated, redirect to signup page
    // return navigate('/home');
    
  // }

  return (

     <>
    
    <Navbar/>
    <div className="container">
      <h1 className='nav'>Welcome to the Railway Ticket Booking Website</h1>
      <nav>
       
        <ul >
          <li>
            <Link  className='button' to="/booking">Ticket Booking</Link>
          </li>
          <li>
            <Link className='button'  to="/pnr-status">PNR Status</Link>
          </li>
          <li>
            <Link  className='button'  to="/train-status">Train Running Status</Link>
          </li>
          <li>
            <Link className='button'  to="/train-details">Train Details</Link>
          </li>
          <li>
            <Link className='button'  to="/cancel-ticket">Cancel Ticket</Link>
          </li>
          <li>
            <Link className='button'  to="/get-fare">Get Fare</Link>
          </li>
        </ul>
       
      </nav>
    </div>
    </>)
   
   

   
  
}




 


export default Home