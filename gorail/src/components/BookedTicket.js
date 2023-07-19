import React, { useState } from 'react'
import Navbar from './Navbar';
function BookedTicket() {
  
    const [tickets, setTickets] = useState([]);
  const [ticketNumber, setTicketNumber] = useState('');

  const handleTicketNumberChange = (event) => {
    setTicketNumber(event.target.value);
  };

  const handleTicketBooking = (event) => {
    event.preventDefault();

    // Check if the ticket number is not empty
    if (ticketNumber.trim() !== '') {
      // Add the ticket to the list of booked tickets
      setTickets((prevTickets) => [...prevTickets, ticketNumber]);

      // Clear the ticket number input
      setTicketNumber('');
    }
  };

  const handleTicketCancellation = (ticket) => {
    // Filter out the cancelled ticket from the list
    const updatedTickets = tickets.filter((t) => t !== ticket);

    // Update the list of booked tickets
    setTickets(updatedTickets);

    // Show a cancellation notification to the user
    alert(`Ticket ${ticket} has been cancelled.`);
  };
 
  return (
    <>
    <Navbar/>
    <div className="container">
      <h4>Booked Ticket</h4>
       
      <div className="mt-4">
        {tickets.length > 0 ? (
          <div>
            <h3>Booked Tickets</h3>
            <ul>
              {tickets.map((ticket) => (
                <li key={ticket}>
                  Ticket: {ticket}
                  <button className="btn btn-danger ml-2" onClick={() => handleTicketCancellation(ticket)}>
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No tickets booked yet.</p>
        )}
      </div>
    </div>
  
    </>
  )
}
 


export default BookedTicket