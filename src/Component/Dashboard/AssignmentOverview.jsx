import React from 'react'
import Pending from '../../Images/Pending.png'
import Received from '../../Images/Received.png'
import Reviewed from '../../Images/Reviewed.png'
import NotRecieve from '../../Images/NotRecieve.png'
import AssignmentReturn from '../../Images/AssignmentReturn.png'
const AssignmentOverview = () => {
  return (
    <div className='Assignments_Subdetail_Container'>
          <span className='heading'>Assignments Overview</span>
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
  )
}

export default AssignmentOverview