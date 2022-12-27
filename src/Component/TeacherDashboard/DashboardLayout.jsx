import React from 'react'
import Navbar2 from '../Navbar/Navbar2';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
const DeshboardLayout = () => {
    return (
        <section className='teacherDashboard'>
            <Navbar2 />
            <div className='dashboard_container'>
                <div className='sidebar_container'>
                    <Sidebar />
                </div>
                <div className='sidebarDetail_container'>
                    <Outlet />
                </div>
            </div>
        </section>
    )
}

export default DeshboardLayout