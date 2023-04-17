import React from 'react'
import Navbar2 from '../Navbar/Navbar2';
import './TeacherDashboard.css'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const DeshboardLayout = () => {
    return (
        <>
        <Navbar2 />
        <section id='teacherDashboard'>
                <div className='sidebar_container'>
                    <Sidebar />
                </div>
                <div className='sidebarDetail_container'>
                    <Outlet />
                </div>
            
        </section>
        </>
    )
}

export default DeshboardLayout