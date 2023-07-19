import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-fixed">
      <div className="container">
        <div className="d-flex justify-content-start align-items-center">
          <a className="navbar-brand" href="/home">GoRail</a>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Sign Up</a>
              
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
              
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Profile</a>
              
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;