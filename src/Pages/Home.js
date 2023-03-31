import React from 'react'
import {navItems , BranchSubmenu}  from "../Data/Menu";
import Navbar from '../Component/Navbar/Navbar'
import LoginForm from '../Component/loginSignup/LoginForm';
import CourseForm from '../Component/TeacherDashboard/CourseForm';

const Home = () => {
  return (
    <>
    <LoginForm />
    <Navbar menu={navItems} submenu={BranchSubmenu} />
    <CourseForm/>
    </>
  )
}

export default Home