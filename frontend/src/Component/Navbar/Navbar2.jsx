import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from '../../Images/CSE.png'
import { useSelector } from "react-redux";
import './Navbar.css'


function Navbar2(props) {
  const {user} = useSelector((state)=>state.auth)
  return (
    <>
    <header>
      <nav className="navbar navbar2">
        <Link to="/" className="navbar-logo">
          Acad<span>Tutor</span>
        </Link>
        <div className="profile_pic">
        {
          user === "teacher" ?
            <Link to='/teacher/profile'>
               <img src={img}/>
            </Link>
          :
          <Link to='/student/profile'>
          <img src={img}/>
       </Link>

        }
        </div>
      </nav>
    </header>
    </>
  );
}

export default Navbar2;
