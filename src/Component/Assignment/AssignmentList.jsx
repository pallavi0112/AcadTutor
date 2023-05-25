import React,{useEffect} from 'react'
import axios from 'axios'
import Assignment from './Assignment'

const AssignmentList = () => {
useEffect( ()=>{
  const GetAssignment = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/content/get_teacher_assignment',
      );
      const courses = response.data
      console.log(courses)
      // courses.map((object, index) => {
      //   const sub = object.subjects
      //   setCoursesData((item) => [
      //     ...item,
          
      //       object
          
      //   ]);
      // });

    } catch (err) {
              console.error(err);
              }
  };
  GetAssignment()
},[])
  return (
    <div>
        <Assignment/>
        <Assignment/>
        <Assignment/>
        <Assignment/>
    </div>
  )
}

export default AssignmentList