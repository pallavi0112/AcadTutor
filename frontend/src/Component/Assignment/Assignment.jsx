import React from 'react'
import './Assignment.css'
import pdf from '../../Images/PdfIcon.png'
import {BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import {AssignmentContainer2Show} from '../../features/Reducer'
const Assignment = () => {
  const dispatch = useDispatch()
  return (
    <div className='assignment'>
      <div className='left-side'>
        <div className='imgBx'>
          <img src={pdf} />
        </div>
        <div>
          <h4 className='title'>title</h4>
          <span className='date'>Posted on: 26/4/23</span>
        </div>
      </div>
      <div className='right-side'>
        <div>
          <h4 className='title'>Due on: 26/4/23</h4>
          <span className='date'>subject name</span>
        </div>
        <div className='imgBx'>
          <button onClick={() => dispatch(AssignmentContainer2Show(true))}>
               <BsFillArrowRightSquareFill />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Assignment