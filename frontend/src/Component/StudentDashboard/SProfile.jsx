import React from 'react';
import './SProfile.css';
import { ImCross , ImYoutube , ImLinkedin } from "react-icons/im";
import Courses from '../TeacherDashboard/Courses';
import { Link } from 'react-router-dom';
function TProfile() {
  return (
    <div className="profile-container">
      <div className='profile-header'>
      <h3>Student Profile</h3>
      <ImCross/>
      </div>
      <div className="top-area">
        <div className="left-side">
          <img src="" alt="Student" />
        </div>
        <div className="right-side">
          <p>Student Name</p>
          <span>Branch</span>
          <span>Semester</span>
        </div>
      </div>
      <hr />
      <div className="middle-area">
        <h2>About</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula quam vel lacus ultricies, eu fermentum purus efficitur. Praesent varius mauris in lacus consectetur, in malesuada dolor pulvinar. Nam sit amet ullamcorper sapien. Donec vitae neque vel dolor efficitur consequat. In ullamcorper venenatis metus, at faucibus mauris elementum eget. Donec ornare, sapien in iaculis elementum, lacus sapien ullamcorper nunc, non lacinia nulla tortor nec nisl. Fusce posuere ligula ut odio vehicula, eget luctus metus lobortis. Nullam vel vestibulum enim.</p>
      </div>
      <div className="bottom-area">
      </div>
      <hr/>
      <div className='courses-container'>
        <h2>Courses</h2>
      <Courses/>
      </div>
    </div>
  );
}

export default TProfile;
