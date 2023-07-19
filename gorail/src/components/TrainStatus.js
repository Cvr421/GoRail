import React, { useState } from 'react';
import axios from 'axios';
import './TrainStatus.css';
import Navbar from './Navbar';

function TrainStatus() {
  const [trainNumber, setTrainNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [runningStatus, setRunningStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:3001/train-live");
      setRunningStatus(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="train-running-status-container">
      <h2>Train Running Status</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="trainNumber">Train Number:</label>
          <input type="text" id="trainNumber" className="form-control" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Get Running Status</button>
      </form>

      {isLoading && <div>Loading...</div>}

      {runningStatus && (
        <div className="running-status">
          <h3>Train Running Status</h3>
          <p>Train Number: {runningStatus.trainNumber}</p>
          <p>Start Date: {runningStatus.startDate}</p>
          <p>Status: {runningStatus.status}</p>
          {/* Display other relevant information */}
        </div>
      )}
    </div>
    </>
  );
}

export default TrainStatus;
