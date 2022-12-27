import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentPage from "./Pages/ContentPage";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import BranchPage from "./Pages/BranchPage";
import Subject from "./Pages/Subject";
import TeacherDashboard from "./Pages/TeacherDashboard";
import './App.css'
import React from 'react'
import CourseForm from "./Component/TeacherDashboard/CourseForm";
import Courses from "./Component/TeacherDashboard/Courses";
import Assignments from "./Component/TeacherDashboard/Assignments";
import Doubts from "./Component/TeacherDashboard/Doubts";
import Dashboard from "./Component/TeacherDashboard/Dashboard";
const App = () => {
  return (
    <>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path=":branch">
              <Route index element={<BranchPage />} />
              <Route path=":sem/:subject">
                <Route index element={<Subject />} />
                <Route path=":unit" element={<ContentPage />} />
              </Route>
            </Route>
            <Route path="/signup" element={<SignUp />} />
            

            <Route exact path="teacherdashboard" element={<TeacherDashboard />}>
              <Route path="" element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="assignment" element={<Assignments />} />
              <Route path="doubts" element={<Doubts />} />
              <Route path="createcourse" elment={<CourseForm/>}/>
            </Route>
          </Routes>
    </>
  );
}

export default App;
