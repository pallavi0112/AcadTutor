import React from 'react'
import './Courses.css'
import { CoursesData } from '../../Data/Courses'
import { FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Courses = () => {
    return (
        <>
            <div className='teacherCourses_container'>
                <div className='heading'>
                    <h3>Courses</h3>
                    <button
                        type="button"
                        className="Formbutton"
                    >
                    <Link to='/createcourse'>
                        Create New Course <FaPlusCircle />
                    </Link>
                    </button>
                </div>
                <div className='grid_container'>
                    {
                        CoursesData.map((item) => {
                            return (
                                <div>
                                    <img src={item.Icon} />
                                    <span className='title'>{item.title}</span>
                                    <span className='sem'>{item.sem} semester</span>
                                    <button
                                        type="button"
                                        className="Formbutton"
                                    >
                                        view course
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Courses