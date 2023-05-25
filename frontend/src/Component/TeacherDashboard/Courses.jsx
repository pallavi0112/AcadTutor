import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css'
import axios from 'axios';
import { FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
const Courses = () => {
    const { user } = useSelector((state) => state.auth)
    const [CoursesData,setCoursesData] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        const GetCoursesData = async () => {
            try {
              const response = await axios.get(
                `http://127.0.0.1:8000/content/teacher_courses`,
              );
              const courses = response.data
              console.log(courses)
              courses.map((object, index) => {
                const sub = object.subjects
                setCoursesData((item) => [
                  ...item,
                  
                    object
                  
                ]);
              });
      
            } catch (err) {
        console.error(err);
      }
          };
      GetCoursesData();
    },[])
    return (
        <>
            {/* <div className='teacherCourses_container'>
                <div className='heading'>
                    <h3>Courses</h3>
                    {
                        user === "student"
                            ? ''
                            : <button
                                type="button"
                                className="Formbutton"
                            >
                                <Link to='/teacher/dashboard/createcourse'>
                                    Create New Course  +
                                </Link>
                            </button>

                    }
                </div> */}
                <div className='Courses grid_container'>
                    {
                        CoursesData.map((item) => {
                            return (
                                <div>
                                    <img src={item.img_link} />
                                    <span className='title'>{item.c_name}</span>
                                    <span className='sem'>Semester : {item.sem}</span>
                                    <button
                                        type="button"
                                        className="Formbutton" value={item._id} onClick={(e)=>{
                                            navigate(`/cs/${e.target.value}`, { replace: true });
                                        }}
                                    >
                                        view course
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            {/* </div> */}
        </>
    )
}

export default Courses