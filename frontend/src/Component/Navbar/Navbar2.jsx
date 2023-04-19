import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'


function Navbar2(props) {

  return (
    <>
    <header>
      <nav className="navbar navbar2">
        <Link to="/" className="navbar-logo">
          Acad<span>Tutor</span>
        </Link>
        <div className="profile-pic">
            
        </div>
      </nav>
    </header>
    </>
  );
}

export default Navbar2;
