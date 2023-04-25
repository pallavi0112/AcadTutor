import React, { useState } from 'react'
import './Sidebar.css'
import { sidebar } from '../../Data/Sidebar'
import { Link , useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { logout } from '../../features/users/authSlice'
const Sidebar = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [active, setActive] = useState(null)
  const Logout = () =>{
    dispatch(logout())
    navigate("/");

  }
  return (
    <>
      <div className='dashboard_sidebar'>
        <ul>
          { user === 'teacher' ? 
            sidebar.map((item, index) => {
              return (
                <li key={index}
                  onClick={() => setActive(item.title)}
                  className={`${active == item.title && 'active'}`}>
                  <Link to={item.title === 'Dashboard' ? '/teacher/dashboard' : item.title === 'Courses' ? '/teacher/dashboard/courses' : item.title === 'Assignments' ? '/teacher/dashboard/assignment' : item.title === 'Doubts' ? '/teacher/dashboard/doubts' : item.title === "Settings" ? '/teacher/dashboard/settings' : '' }><img src={item.Icon} />{item.title}</Link>
                </li>
              )
            }) 
            : 
            sidebar.map((item, index) => {
              return (
                <li key={index}
                  onClick={() => setActive(item.title)}
                  className={`${active == item.title && 'active'}`}>
                  <Link to={item.title === 'Dashboard' ? '/student/dashboard' : item.title === 'Courses' ? '/student/dashboard/courses' : item.title === 'Assignments' ? '/student/dashboard/assignment' : item.title === 'Doubts' ? '/student/dashboard/doubts' : item.title === "Settings" ? '/student/dashboard/settings' : ''}><img src={item.Icon} />{item.title}</Link>
                </li>
              )
            }) 
          }
        </ul>
        <button type='button' className="Formbutton" onClick={Logout}>Logout</button>
      </div>
    </>
  )
}

export default Sidebar