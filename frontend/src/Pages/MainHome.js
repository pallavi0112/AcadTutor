import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import { navItems, BranchSubmenu } from "../Data/Menu";
import LoginForm from '../Component/loginSignup/LoginForm';
import { Outlet } from 'react-router-dom';
const MainHome = () => {
  return (
    <>
        <LoginForm />
        <Navbar menu={navItems} submenu={BranchSubmenu} />
        <Outlet/>
    </>
  )
}

export default MainHome