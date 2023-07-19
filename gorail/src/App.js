
import './App.css';
import './style.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
// import { useNavigate} from "react-router-dom"
import Home from './components/Home';
import Booking from './components/Booking';
import PNRStatus from './components/PNRStatus';
import TrainStatus from './components/TrainStatus.js';

import CancelTicket from './components/CancelTicket';
import BookedTicket from './components/BookedTicket';
import TrainDetail from './components/TrainDetail';
import GetFare from './components/GetFare';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
 
  return (
    <div className="App">
    <Router>
      
      <Routes>
          <Route exact path="/" element={< SignUp/>} />
          <Route path="/booking" element={<Booking/>}/>
          <Route path="/pnr-status" element={<PNRStatus/>}/>
          <Route path="/train-status" element={<TrainStatus/>}/>
          <Route path="/booked-ticket" element={<BookedTicket/>}/>
          <Route path="/cancel-ticket" element={<CancelTicket/>}/>
          <Route path="/train-details" element={<TrainDetail/>}/>      
          <Route path="/get-fare" element={<GetFare/>}/>      
          <Route path="/login" element={<Login/>}/>      
          <Route path="/home" element={<Home/>}/>      
          

          
          {/* Add more routes for other pages, if needed */}
        </Routes>
        </Router>
    </div>
  );
}

export default App;
