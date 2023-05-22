import React from "react";
import './Courses.css'
import { FaPlusCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Courses from "./Courses";
const CoursesContainer = () => {
    const { user } = useSelector((state) => state.auth)
  return (
    <div className="teacherCourses_container">
      <div className="heading">
        <h3>Courses</h3>
        {user === "student" ? (
          ""
        ) : (
          <button type="button" className="Formbutton">
            <Link to="/teacher/dashboard/createcourse">
              Create New Course +
            </Link>
          </button>
        )}
      </div>
      <Courses/>
    </div>
  );
};

export default CoursesContainer;
