import React from 'react'
import './TeacherDashboard.css'
import Pending from '../../Images/Pending.png'
import Received from '../../Images/Received.png'
import Reviewed from '../../Images/Reviewed.png'
import NotRecieve from '../../Images/NotRecieve.png'
import AssignmentReturn from '../../Images/AssignmentReturn.png'
import PdfIcon from '../../Images/PdfIcon.png'
import UserIcon from '../../Images/UserIcon.png'
import { FaPlus } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
const Dashboard = () => {
  return (
    <>
      <div id='dash_container'>
        <h3>Your Courses</h3>
        <div className='Courses_Subdetail_Container'>
          <div>
            <img src=" " />
            <span className='title'>ML</span>
            <span className='sem'> semester</span>
          </div>
          <div>
            <img src=" " />
            <span className='title'>CN</span>
            <span className='sem'> semester</span>
          </div>
          <div>
            <img src=" " />
            <span className='title'>Python</span>
            <span className='sem'> semester</span>
          </div>
          <div>
            <img src=" " />
            <span className='title'>TOC</span>
            <span className='sem'> semester</span>
          </div>
          <div>
            <img src=" " />
            <span className='title'>View all Courses</span>

          </div>
        </div>
        <div className='Assignments_Subdetail_Container'>
          <span>Assignments Overview</span>
          <div className='Assignments_Subdetail'>
            <div>
              <div className='ImgBx' style={{ backgroundColor: "#FFC694" }}>
                <img src={Received} />
              </div>
              <span className='range'>30</span>
              <span className='title'>Received</span>
            </div>
            <div className='vertical_line'></div>
            <div>
              <div className='ImgBx' style={{ backgroundColor: "#98C1FE" }} ><img src={NotRecieve} /></div>
              <span className='range'>30</span>
              <span className='title'>Yet to Receive</span>
            </div>
            <div className='vertical_line'></div>
            <div>
              <div className='ImgBx' style={{ backgroundColor: "#FFB2B2" }}><img src={Reviewed} /></div>
              <span className='range'>30</span>
              <span className='title'>Reviewed</span>
            </div>
            <div className='vertical_line'></div>
            <div>
              <div className='ImgBx' style={{ backgroundColor: "#3FD9B1" }}><img src={Pending} /></div>
              <span className='range'>30</span>
              <span className='title'>Pending Reviews</span>
            </div>
            <div className='vertical_line'></div>
            <div>
              <div className='ImgBx' style={{ backgroundColor: "#000000" }}><img src={AssignmentReturn} /></div>
              <span className='heading'>View all Assignments</span>
            </div>
          </div>
        </div>
        <div className='other_actions'>
          <div>
            <span>Students Performance</span>
            <div className='Performance_result_container'>
              <div className='Performance_container'>
                <div className='ImgBx'><img src={UserIcon} /></div>
                <div className='performance_by'>
                  <span className='stu_name'>B Rahul</span>
                  <span className='stu_rollno'>300202219014</span>
                </div>
                <div>
                  <span className='range'>90%</span>
                </div>
              </div>
              <div className='saparation'></div>
              <div className='Performance_container'>
                <div className='ImgBx'><img src={UserIcon} /></div>
                <div className='performance_by'>
                  <span className='stu_name'>Nishan Kumar</span>
                  <span className='stu_rollno'>300202219030 </span>
                </div>
                <div>
                  <span className='range'>90%</span>
                </div>
              </div>
              <div className='saparation'></div>
              <div className='Performance_container'>
                <div className='ImgBx'><img src={UserIcon} /></div>
                <div className='performance_by'>
                  <span className='stu_name'>Pallavi Soldey</span>
                  <span className='stu_rollno'>300202219031</span>
                </div>
                <div>
                  <span className='range'>84%</span>
                </div>
              </div>
            </div>
            <div className='Visit_link'><a href='/'>View Result List</a></div>
          </div>
          <div>
            <span>Notes/Anouncements</span>
            <div>
              <div className='notes_container'>
                <div className='ImgBx'><img src={PdfIcon} /></div>
                <div className='notes'>
                  <span className='heading'>Compelete Assignment of Unit-01</span>
                  <span className='desc'>Last Date for Submission of Assignment</span>
                  <span className='date'>10 Dec 2022</span>
                </div>
                <div className='editIcon'><FaEllipsisV /></div>
              </div>
              <div className='notes_container'>
                <div className='ImgBx'><img src={PdfIcon} /></div>
                <div className='notes'>
                  <span className='heading'>Compelete Assignment of Unit-01</span>
                  <span className='desc'>Last Date for Submission of Assignment</span>
                  <span className='date'>10 Dec 2022</span>
                </div>
                <div className='editIcon'><FaEllipsisV /></div>
              </div>
            </div>
            <button
              type="button"
              className="Formbutton"
            >
              Add Notes<FaPlus />
            </button>

            <div className='Visit_link'><a href='/'>View All Notes</a></div>
          </div>
          <div>
            <span>Students Feed</span>
            <div>
              <div className='feed_container'>
                <div className='ImgBx'><img src={UserIcon} /></div>
                <div className='feeds'>
                  <span className='name'>Nishan Kumar</span>
                  <div>
                    <span className='sub_name'>Doubt in ML : </span>
                    <span className='doubt'>What is KDD and SEMMA?</span>
                  </div>
                </div>
              </div>
              <div className='feed_container'>
                <div className='ImgBx'><img src={UserIcon} /></div>
                <div className='feeds'>
                  <span className='name'>Nishan Kumar</span>
                  <div>
                    <span className='sub_name'>Doubt in ML : </span>
                    <span className='doubt'>What is KDD and SEMMA?</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='Visit_link'><a href='/'>View All Doubts</a></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard