import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import Dropdown from "./Dropdown";
import Button from "./Button";
import dp from "../../Images/user.png"

function Navbar(props) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  console.log(isAuthenticated)
  const guestLinks = (
    <Fragment>
      <div className="btnBlock">
        <Button title="SignIn" cname="btn signin" />
        <Button title="SignUp" cname="btn signup" path="/signup" />
      </div>
    </Fragment>
  );
  const profilepic = (
     <Link to="/"><img src={dp} alt="profile pic" className="profile_pic"/></Link>
     
  )

  const [dropdown, setDropdown] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY)
    };

    window.addEventListener('scroll', updatePosition)
  });

  return (
    <>
      <header className={scrollPosition > 0 ? "scrolled-navbar" : ""}>
        <nav className="navbar">
          <Link to="/" className="navbar-logo">
            Acad<span>Tutor</span>
          </Link>
          <div className="menu-container">
            <ul className="nav-items">
              {props.menu.map((item) => {
                if (item.title === "Branches") {
                  return (
                    <li
                      key={item.id}
                      className={item.cName}
                      onMouseEnter={() => setDropdown(true)}
                      onMouseLeave={() => setDropdown(false)}
                      onClick={() => setDropdown(true)}
                    >
                      <Link to={item.path}>{item.title}</Link>
                      {dropdown && <Dropdown submenu={props.submenu} />}
                    </li>
                  );
                }
                return (
                  <li key={item.id} className={item.cName}>
                    <Link to={`${item.path}`}>{item.title}</Link>
                  </li>
                );
              })}
            </ul>
            
            {(isAuthenticated === 'true') ? profilepic : guestLinks}
            {/* {isAuthenticated ? profilepic : guestLinks} */}
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
