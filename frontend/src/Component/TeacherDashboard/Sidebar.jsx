import React, { useState } from 'react'
import './Sidebar.css'
import { sidebar } from '../../Data/Sidebar'
import { Link } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { logout } from '../../features/users/authSlice'
const Sidebar = () => {
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const [active, setActive] = useState(null)
  return (
    <>
      <div className='dashboard_sidebar'>
        <ul>
          {
            sidebar.map((item, index) => {
              return (
                <li key={index}
                  onClick={() => setActive(item.title)}
                  className={`${active == item.title && 'active'}`}>
                  <Link to={item.title === 'Dashboard' ? '/teacher/dashboard' : item.title === 'Courses' ? '/teacher/dashboard/courses' : item.title === 'Assignments' ? '/teacher/dashboard/assignment' : item.title === 'Doubts' ? '/teacher/dashboard/doubts' : ''}><img src={item.Icon} />{item.title}</Link>
                </li>
              )
            })
          }
        </ul>
        <button type='button' className="Formbutton" onClick={()=>dispatch(logout())}>Logout</button>
      </div>
    </>
  )
}

export default Sidebar