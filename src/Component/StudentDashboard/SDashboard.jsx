import React from 'react'
import EnrolledCourses from '../Dashboard/EnrolledCourses'
import AssignmentOverview from '../Dashboard/AssignmentOverview'
import Performance from '../Dashboard/Performance'
import NotesAnnounce from '../Dashboard/NotesAnnounce'
import Feed from '../Dashboard/Feed'
import '../Dashboard/Dashboard.css'
const SDashboard = () => {
  return (
    <>
      <div id='dash_container'>
        <h3>Your Courses</h3>
        <EnrolledCourses />
        <AssignmentOverview />
        <div className='other_actions'>
          <Performance />
          <NotesAnnounce />
          <Feed />

        </div>
      </div>
    </>
  )
}

export default SDashboard