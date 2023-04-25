import React from 'react'
import {useSelector} from 'react-redux'
const EnrolledCourses = () => {
  const {user} = useSelector((state) => state.auth)
  return (
    <div className='Courses_Subdetail_Container'>
          <div>
            <img src=" " alt='' />
            <span className='title'>ML</span>
            {
              user === 'student' ?
              <div className='teacher-details'>
                <img src=''/>
                <span className='teacher-name'>Dr. Shanu K Rakesh</span>
              </div>
              :
              <span className='sem'> semester</span>
            }
            
          </div>
          <div>
            <img src=" " alt='' />
            <span className='title'>CN</span>
            {
              user === 'student' ?
              <div>
                <img src=''/>
                <span className='teacher-name'>Dr. Shanu K Rakesh</span>
              </div>
              :
              <span className='sem'> semester</span>
            }
          </div>
          <div>
            <img src=" " alt='' />
            <span className='title'>Python</span>
            {
              user === 'student' ?
              <div>
                <img src=''/>
                <span className='teacher-name'>Dr. Shanu K Rakesh</span>
              </div>
              :
              <span className='sem'> semester</span>
            }
          </div>
          <div>
            <img src=" " alt='' />
            <span className='title'>TOC</span>
            {
              user === 'student' ?
              <div>
                <img src=''/>
                <span className='teacher-name'>Dr. Shanu K Rakesh</span>
              </div>
              :
              <span className='sem'> semester</span>
            }
          </div>
          <div>
            <img src=" " alt='' />
            <span className='title'>View all Courses</span>

          </div>
        </div>
  )
}

export default EnrolledCourses