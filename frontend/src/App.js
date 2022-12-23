import { Route, Routes } from "react-router-dom";
import ContentPage from "./Pages/ContentPage";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import BranchPage from "./Pages/BranchPage";
import Subject from "./Pages/Subject";
import TeacherDashboard from "./Pages/TeacherDashboard";
import './App.css'
import React from 'react'
import CourseForm from "./Component/CreateForms/CourseForm";
import Courses from "./Component/CreateForms/Courses";
import Assignments from "./Component/CreateForms/Assignments";
import Doubts from "./Component/CreateForms/Doubts";
const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="" element={<Home />}></Route>
        <Route exact path=":branch">
          <Route index element={<BranchPage />}/>
          <Route path=":sem/:subject">
            <Route index  element={<Subject />}/>
            <Route path=":unit" element={<ContentPage />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />


        <Route exact path="teacherdashboard">
          <Route index element={<TeacherDashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assignment" element={<Assignments />} />
          <Route path="doubts" element={<Doubts />} />
        </Route>
      </Routes>
    </>
  );

}


export default App;
