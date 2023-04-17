import React from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaInstagramSquare , FaTwitterSquare , FaLinkedin ,FaGooglePlusSquare} from 'react-icons/fa';
import { Link } from 'react-router-dom'
import FooterImg from '../../Images/FooterImg.png'
const Explore = [
  {
    name: "Home",
    link: '/'
  },
  {
    name: "About",
    link: '/'
  },
  {
    name: "Branches",
    link: '/'
  }
];
const Support = [
  {
    name: "Signup",
    link: '/'
  },
  {
    name: "Contact us",
    link: '/'
  },
  {
    name: "Resources",
    link: '/'
  },
  {
    name: "E-books ",
    link: '/'
  }
];
const Branches = [
  {
    name: "CSE",
    link: '/'
  },
  {
    name: "MECH",
    link: '/'
  },
  {
    name: "CIVIL",
    link: '/'
  },
  {
    name: "ML",
    link: '/'
  },
  {
    name: "EEE",
    link: '/'
  },
  {
    name: "AI",
    link: '/'
  },
];
const Footer = () => {
  return (
    <div className='footer-section'>
      <div className='footer-circle'></div>
      <div className='footer-top'>
        <div className='footer-links'>
          <div>
            <h3>Acadtutor</h3>
            <p>"Unlock your full academic potential with Academic Tutor - your personalized e-learning companion."</p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              {Explore.map((val, index) => {
                return <li key={index} ><Link to={val.link}>{val.name}</Link></li>
              })}
            </ul>
          </div>
          <div>
            <h3>Support</h3>
            <ul>
              {Support.map((val, index) => {
                return <li key={index} ><Link to={val.link}>{val.name}</Link></li>
              })}
            </ul>
          </div>
          <div>
            <h3>Branches</h3>
            <ul>
              {Branches.map((val, index) => {
                return <li key={index} ><Link to={val.link}>{val.name}</Link></li>
              })}
            </ul>
          </div>
          <div className='footer-img'>
            <img src={FooterImg} alt='footer' />
          </div>
        </div>
      </div>

      <div className='footer-separation'></div>
      <div className='footer-bottom'>
        <p>&copy; Acadtutor 2023 | All rights reserved.</p>
        <div className='social-links'>
          <FaInstagramSquare className='icon'/>
          <FaTwitterSquare className='icon'/>
          <FaLinkedin className='icon'/>
          <FaGooglePlusSquare className='icon'/>
        </div>
      </div>
    </div>
  )
}

export default Footer