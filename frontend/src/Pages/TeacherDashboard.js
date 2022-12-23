import React from 'react'
import CourseForm from '../Component/CreateForms/CourseForm'
import TopicForm from '../Component/CreateForms/TopicForm';
import Navbar2 from '../Component/Navbar/Navbar2';
import Sidebar from '../Component/CreateForms/Sidebar';
import Courses from '../Component/CreateForms/Courses';
import { Outlet } from 'react-router-dom';
const TeacherDashboard = () => {
  return (
    <>
       <section className='teacherDashboard'>
          <Navbar2 />
        <div className='dashboard_container'>
          <div className='sidebar_container'>
              <Sidebar/>
          </div>
          <div className='sidebarDetail_container'>
          <Outlet />
          {/* <Courses/> */}
          {/* <CourseForm/>
           <TopicForm/> */}
           <h1>I am parent here</h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default TeacherDashboard;