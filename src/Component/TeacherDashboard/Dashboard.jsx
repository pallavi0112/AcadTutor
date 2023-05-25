import React from 'react'
import { useEffect } from 'react'
// import './TeacherDashboard.css'
import '../Dashboard/Dashboard.css'
import EnrolledCourses from '../Dashboard/EnrolledCourses'
import AssignmentOverview from '../Dashboard/AssignmentOverview'
import Performance from '../Dashboard/Performance'
import NotesAnnounce from '../Dashboard/NotesAnnounce'
import Feed from '../Dashboard/Feed'
const Dashboard = () => {
  useEffect(()=>{
    
  },[])
  return (
    <>
      <div id='dash_container'>
        <h3>Your Courses</h3>
        <EnrolledCourses/>
        <AssignmentOverview/>
        <div className='other_actions'>
         <Performance/>
          <NotesAnnounce/>
          <Feed/>
        </div>
      </div>
    </>
  )
}

export default Dashboard