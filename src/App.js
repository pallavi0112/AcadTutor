import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContentPage from "./Pages/ContentPage";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import BranchPage from "./Pages/BranchPage";
import Subject from "./Pages/Subject";
import TeacherDashboard from "./Pages/TeacherDashboard";
import StudentDashboard from "./Pages/StudentDashboard";
import './App.css'
import React from 'react'
import CourseForm from "./Component/TeacherDashboard/CourseForm";
import Courses from "./Component/TeacherDashboard/Courses";
import Assignments from "./Component/TeacherDashboard/Assignments";
import Doubts from "./Component/TeacherDashboard/Doubts";
import Dashboard from "./Component/TeacherDashboard/Dashboard";

import SDashboard from "./Component/StudentDashboard/SDashboard";
import SDoubt from "./Component/StudentDashboard/SDoubt";
import SAssignment from "./Component/StudentDashboard/SAssignment";
import StudentProfile from "./Pages/StudentProfile";
import TeacherProfile from "./Pages/TeacherProfile";
import ProtectedRoute from './ProtectedRoute';
import Navbar from './Component/Navbar/Navbar'
import { navItems, BranchSubmenu } from "./Data/Menu";
import { useSelector } from "react-redux";
import Unauthorized from "./Pages/Unauthorized";
import Profile from "./Component/StudentDashboard/Profile";
const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const userRole = useSelector((state) => state.auth.user);
  return (
    <>
      {/* <Navbar menu={navItems} submenu={BranchSubmenu} /> */}
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/teacher/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['teacher', 'admin']} userRole={userRole}>
            <TeacherDashboard />
          </ProtectedRoute>}
        />



        <Route path="/student/dashboard" element={
          <ProtectedRoute isAuthenticated={isAuthenticated} allowedRoles={['student', 'admin']} userRole={userRole}>
            <StudentDashboard />
          </ProtectedRoute>}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route exact path=":branch">
          <Route index element={<BranchPage />} />
          <Route path=":subject_id">
            <Route index element={<Subject />} />
            <Route path=":unit" element={<ContentPage />} />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student/profile" element={<StudentProfile />}></Route>
        <Route path="/teacher/profile" element={<TeacherProfile />}></Route>

        <Route exact path="/student/dashboard" element={<StudentDashboard />}>
          <Route exact index element={<SDashboard />} />
          <Route exact path="courses" element={<Courses />} />
          <Route exact path="assignment" element={<SAssignment />} />
          <Route exact path="doubts" element={<SDoubt />} />
          <Route exact  path="settings" element={<Profile />} />
        </Route>

        <Route exact path="/teacher/dashboard" element={<TeacherDashboard />}>
          <Route exact index element={<Dashboard />} />
          <Route exact  path="courses" element={<Courses />} />
          <Route exact path="assignment" element={<Assignments />} />
          <Route exact path="doubts" element={<Doubts />} />
          <Route exact path="createcourse" element={<CourseForm />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;