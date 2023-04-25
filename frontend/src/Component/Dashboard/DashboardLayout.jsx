import React from 'react'
import Navbar2 from '../Navbar/Navbar2';
import './Layout.css'
import Sidebar from '../TeacherDashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
const DeshboardLayout = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        <>
            {isAuthenticated ? 
               <React.Fragment>
               <Navbar2 />
               <section id='teacher-student-Dashboard'>
              <div className='sidebar_container'>
                     <Sidebar />
                </div>
              <div className='sidebarDetail_container'>
              <Outlet />
              </div>
             </section>
               </React.Fragment>
            : 
            <h2>You are not authenticated </h2>

}



        </>

    )
}

export default DeshboardLayout