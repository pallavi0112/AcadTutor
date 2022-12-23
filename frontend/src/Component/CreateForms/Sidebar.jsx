import React from 'react'
import './Sidebar.css'
import { sidebar } from '../../Data/Sidebar'
import { Link } from 'react-router-dom'
const Sidebar = () => {
  return (
    <>
      <div className='dashboard_sidebar'>
           <ul>
            {
              sidebar.map((item , index)=>{
                return (
                  <li key={index} className="active">
                  <Link to={item.title === 'Dashboard' ? '/teacherdashboard' : item.title === 'Courses' ? '/teacherdashboard/courses'  :  item.title === 'Assignments' ? '/teacherdashboard/assignment' : item.title === 'Doubts' ? '/teacherdashboard/doubts' : '' }><img src={item.Icon}/>{item.title}</Link>
                </li>
                )
              })
            }
           </ul>
           <button type='button' className="Formbutton">Logout</button>
      </div>
    </>
  )
}

export default Sidebar