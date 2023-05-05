import React, { useState } from 'react'
import './SignupForm.css';
import { NewStudent } from '../../features/student/AddStudentSlice';
import { NewTeacher } from '../../features/teacher/AddTeacherSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [newstudent, setNewstudent] = useState({
    student_name: "",
    student_email: "",
    student_pswd: "",
    student_cpswd: "",
    Branch: "",
    semester: ""
  })
  const [newteacher, setNewteacher] = useState({
    teacher_name: "",
    teacher_email: "",
    teacher_pswd: "",
    teacher_cpswd: "",
    teacher_refc: ""
  })
  const [teacher, setTeacher] = useState(false)
  const [student, setStudent] = useState(true)
  const [slide, setSlide] = useState(true)
  const [emailError, setEmailError] = useState({
    iserror: false,
    error: ''
  });
  const [passError, setPassError] = useState({
    iserror: false,
    error: ''
  })
  const [nameError, setNameError] = useState({
    iserror: false,
    error: ''
  })
  const [confirmError, setConfirmError] = useState({
    iserror: false,
    error: ''
  })
  const stud_status = useSelector((state) => state.StudentSignUp.status)
  const stud_error = useSelector((state) => state.StudentSignUp.error)

  const tea_status = useSelector((state) => state.TeacherSignUp.status)
  const tea_error = useSelector((state) => state.TeacherSignUp.error)

  const updateTeacherForm = () => {
    setSlide(false)
    setTeacher(true);
    setStudent(false);
  }
  const updateStudentForm = () => {
    setSlide(true)
    setTeacher(false);
    setStudent(true);
  }
  const StudentvalidateForm = () => {
    console.log("Validate Form is running")
    // const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!emailRegex.test(newstudent.student_email) ) {
      setEmailError({
        iserror: true,
        error: 'Please enter a valid email address.'
      });
      return false;
    }
    if (!passwordRegex.test(newstudent.student_pswd)) {
      setPassError({
        iserror: true,
        error: 'Please enter a valid password(at least 6 characters long and containing at least one letter and one number)'
      });
      return false;
    }
    if (newstudent.student_cpswd !== newstudent.student_cpswd){
      setConfirmError({
        iserror: true,
        error: 'Password does not match'
      });
      return false
    }
    return true;
  }
  const TeachervalidateForm = () => {
    console.log("Validate Form is running")
    // const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!emailRegex.test(newteacher.teacher_email) ) {
      setEmailError({
        iserror: true,
        error: 'Please enter a valid email address.'
      });
      return false;
    }
    if (!passwordRegex.test(newteacher.teacher_pswd)) {
      setPassError({
        iserror: true,
        error: 'Please enter a valid password(at least 6 characters long and containing at least one letter and one number)'
      });
      return false;
    }
    if (newteacher.teacher_cpswd !== newteacher.teacher_cpswd){
      setConfirmError({
        iserror: true,
        error: 'Password does not match'
      });
      return false
    }
    return true;
  }
  const AddNewStudent = (e) => {
    const { name, value } = e.target;
    setNewstudent({ ...newstudent, [name]: value })
  }
  const AddNewteacher = (e) => {
    const { name, value } = e.target;
    setNewteacher({ ...newteacher, [name]: value })
  }
  const AddStudent = (e) => {
    e.preventDefault()
    if (StudentvalidateForm()) {
      console.log("Validate form returning true")
      dispatch(NewStudent(newstudent))
      setNewstudent({
        student_name: "",
        student_email: "",
        student_pswd: "",
        student_cpswd: "",
        Branch: "",
        semester: ""
      })
    }
  }
  const AddTeacher = (e) => {
    e.preventDefault()
    if (TeachervalidateForm()) {
      console.log("Validate form returning true")
      dispatch(NewTeacher(newteacher))
      setNewteacher({
        teacher_name: "",
        teacher_email: "",
        teacher_pswd: "",
        teacher_cpswd: "",
        teacher_refc: ""
      })
    }
  }

  if (stud_status === "loading" || tea_status === "loading") {
    console.log("loading");
  }

  if (stud_status === "failed") {
    console.log(stud_error);
  }
  if (tea_status === "failed") {
    console.log(tea_error);
  }

  if (stud_status === "succeeded") {
    navigate("/");
  }
  if (tea_status === "succeeded") {
    navigate("/");
  }

  return (
    <>
      <div className='wrapper'>
        <div className='form-container'>
          <div className="slide-controls">
            <div id='btn' className={slide ? "left" : "right"}></div>
            <input type="button" value="Student" onClick={updateStudentForm} ></input>
            <input type="button" value="Teacher" onClick={updateTeacherForm}></input>
          </div>
          <div className='innerForm-container'>
            <form action="#" className={student ? "student_form" : "student_signup"} onSubmit={AddStudent}>
              <input type="text" placeholder='Your Name' value={newstudent.student_name} name='student_name' onChange={AddNewStudent} />
              <p>{nameError.error}</p>
              <input type="email" placeholder="Email Address" value={newstudent.student_email} name='student_email' onChange={AddNewStudent} />
              <p>{emailError.error}</p>
              <div className='pswd_box'>
                <input type="password" placeholder="Password" value={newstudent.student_pswd} name='student_pswd' onChange={AddNewStudent} />
                <p>{passError.error}</p>
                <input type="password" placeholder="Confirm Password" value={newstudent.student_cpswd} name='student_cpswd' onChange={AddNewStudent} />
                <p>{confirmError.error}</p>
              </div>
              <div className='select_box'>
                <select value={newstudent.Branch} onChange={AddNewStudent} name="Branch">
                  <option value="0">Branch</option>
                  <option value="CS">CS</option>
                  <option value="AI">AI</option>
                  <option value="ML">ML</option>
                  <option value="EEE">EEE</option>
                  <option value="ET&T">ET&T</option>
                  <option value="Civil">Civil</option>
                  <option value="Mechanical">Mechanical</option>
                </select>
                <select value={newstudent.semester} onChange={AddNewStudent} name="semester">
                  <option value="0">Semester</option>
                  <option value="1">1st</option>
                  <option value="2">2nd</option>
                  <option value="3">3rd</option>
                  <option value="4">4th</option>
                  <option value="5">5th</option>
                  <option value="6">6th</option>
                  <option value="7">7th</option>
                  <option value="8">8th</option>
                </select>
              </div>
              <button
                type="submit"
              >
                Signup
              </button>
              <p className="signup-link">Already have an account? <Link to="/">Sign in</Link></p>
            </form>
            <form action="#" className={teacher ? "teacher_form" : "teacher_signup "} onSubmit={AddTeacher}>
              <input type="txt" placeholder="Your Name" name='teacher_name' value={newteacher.teacher_name} onChange={AddNewteacher} />
              <p>{nameError.error}</p>
              <input type="email" placeholder="Email Address" name='teacher_email' value={newteacher.teacher_email} onChange={AddNewteacher} />
              <p>{emailError.error}</p>
              <div className='pswd_box'>
                <input type="password" placeholder="Password" name='teacher_pswd' value={newteacher.teacher_pswd} onChange={AddNewteacher} />
                <p>{passError.error}</p>
                <input type="password" placeholder="Confirm Password" name='teacher_cpswd' value={newteacher.teacher_cpswd} onChange={AddNewteacher} />
                <p>{confirmError.error}</p>
              </div>
              <input type="text" placeholder="Referral Code" name='teacher_refc' value={newteacher.teacher_refc} onChange={AddNewteacher} />
              <button
                type="submit"
                className="Formbutton"
              >
                Signup
              </button>
              <p className="signup-link">Already have an account? <Link to="/">Sign in</Link></p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
};

export default SignupForm;