import React,{useEffect} from 'react'
import axios from 'axios'
import Assignment from './Assignment'
import { useDispatch , useSelector } from 'react-redux'
import { GetAssignments } from '../../features/teacher/AssignmentSlice'
const AssignmentList = () => {
  const dispatch = useDispatch();
  const {assignmentData} = useSelector((state)=>state.GetAssignment)
useEffect( ()=>{
    dispatch(GetAssignments())
},[GetAssignments])
  return (
    <div>
       {
        assignmentData ? 
        assignmentData.map((assignment , index)=>{
            return <Assignment key={index} Data={assignment} index={index}/>
        })
        : "There is no Assignment yet"
       }
      
        {/* <Assignment/>
        <Assignment/>
        <Assignment/> */}
    </div>
  )
}

export default AssignmentList