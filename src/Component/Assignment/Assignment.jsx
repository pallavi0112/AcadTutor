import React from 'react'
import './Assignment.css'
import pdf from '../../Images/PdfIcon.png'
import {BsFillArrowRightSquareFill } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import {AssignmentContainer2Show} from '../../features/Reducer'
import { FilterAssignmentData } from '../../features/teacher/AssignmentSlice';
const Assignment = ({Data ,index}) => {
  const dispatch = useDispatch()
  const BthHandler = (assignment_name) =>{
   dispatch(AssignmentContainer2Show(true))
   dispatch(FilterAssignmentData(assignment_name))
  }
  return (
    <div className='assignment'>
      <div className='left-side'>
        <div className='imgBx'>
          <img src={pdf} />
        </div>
        <div>
          <h4 className='title'>{Data.assignment_name}</h4>
          <span className='date'>Posted on: </span>
        </div>
      </div>
      <div className='right-side'>
        <div>
          <h4 className='title'>Due on: </h4>
          <span className='date'>{Data.subject_name}</span>
        </div>
        <div className='imgBx'>
          <button onClick={()=>BthHandler(Data.assignment_name)}>
               <BsFillArrowRightSquareFill />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Assignment