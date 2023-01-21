import React from 'react'
import {navItems , BranchSubmenu}  from "../Data/Menu";
import Navbar from '../Component/Navbar/Navbar'
import LoginForm from '../Component/loginSignup/LoginForm';
import CourseForm from '../Component/TeacherDashboard/CourseForm';

const Home = () => {
  return (
    <>
    <Navbar menu={navItems} submenu={BranchSubmenu} />
    <LoginForm />
    <CourseForm/>
    </>
  )
}

export default Home