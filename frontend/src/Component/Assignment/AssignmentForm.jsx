import React, { useState, useEffect,useRef } from "react";
import './AssignmentForm.css'
import Cookies from 'js-cookie';
import axios from "axios";
import youtube from '../../Images/YouTube.png'
import UploadIcon from '../../Images/UploadIcon.png';
import link from '../../Images/Link.png'
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AssignmentFormShow } from "../../features/Reducer";
import ReactQuill from 'react-quill'
import '../../../node_modules/react-quill/dist/quill.snow.css';
// import { showHide } from "../../features/Reducer";

axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const modules = {
  toolbar: [
    
    ["bold", "italic", "underline"],
    [{ list: "odered" }, { list: "bullet" }],
  ],
};
const formats = [
  "bold",
  "italic",
  "underline",
  "odered",
  "bullet",
];

const AssignmentForm = (props) => {
  const dispatch = useDispatch()
  const [assignment, setAssignment] = useState(
    {
      name: "",
      link: "",
      v_link: "",
      marks : "",
      date : ""
    }
  );
  const [instructions, setInstructions] = useState('')
  const [file, setFile] = useState(null)
  const [CoursesData,setCoursesData] = useState([])

  const AddAssignmentData = (e) => {
    const { name, value } = e.target;
    setAssignment((predata) => {
      return {
        ...predata,
        [name]: value
      }
    })
  }
  const createAssignment = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('name', assignment.name)
    formData.append('link', assignment.link)
    formData.append('date', assignment.date)
    formData.append('marks', assignment.marks)
    formData.append('instructions', instructions)
    formData.append('v_link', assignment.v_link)
    formData.append('file', file)
    formData.append('subj_id' , assignment.subject_id)
    formData.append('subj_name' , assignment.subject_name)

    try {
      console.log(formData)
     
      console.log(file)
      console.log(instructions)
      const response = await axios.post(
        `http://127.0.0.1:8000/content/add_assignment`,
        formData

        ,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": Cookies.get('csrftoken')

          },
        },
      );
      console.log({ BACKEND_RESPONSE: response });
      if (response.status === 200) {
        setAssignment(
          {
            name: "",
            link: "",
            v_link: "",
            marks : "",
            date : "",
          }
        )
        setFile(null)
        setInstructions('')
        // dispatch(AssignmentFormShow(false))
         window.location.reload();
        console.log("condition is working")
      }
      // else{
      //     localStorage.setItem(unit_id , false)
      // }

    } catch (err) {
      // localStorage.setItem(unit_id, false)
      console.log("error")
      console.error(err);
    }

  };
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
    <div className="AssignmentForm_Container">
      <div className="AssignmentForm_Wrapper">
        <div className="addtopic">
          <h2>New Assignment</h2>
          <button className="crossbtn2" onClick={() => dispatch(AssignmentFormShow(false))}>
            <FaTimes />
          </button>
        </div>
        <div className="form_container">
          <form action="#" className="AssignmentForm" onSubmit={createAssignment}>
            <div>
              <label>Assignment Name</label>
              <input
                type="text"
                value={assignment.name}
                name="name"
                onChange={AddAssignmentData}
              />
            </div>
            <div>
              <div className="instructions">
                <label>Instructions</label>
                <ReactQuill
                 
                  modules={modules}
                  formats={formats}
                  value={instructions}
                  onChange={(e)=>setInstructions(e)}
                />
              </div>
              <div>
                <div>
                  <label htmlFor="semester">Subjects</label>
                  <select id="semester" 
                    name="subject_id"
                    onChange={(e)=>{
                      console.log(e.target.selectedOptions[0].text)
                      setAssignment((predata) => {
                          return {
                            ...predata,
                            subject_id: e.target.value,
                            subject_name:e.target.selectedOptions[0].text
                          }
                        })
                    }}
                   >
                    <option value=""></option>
                    { CoursesData.map((item) => <option value={item._id}>{item.c_name}</option>) }
                  </select>
                </div>
                <div>
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={assignment.date}
                    name="date"
                    onChange={AddAssignmentData}
                  />
                </div>
                <div>
                  <label>Points</label>
                  <input
                    type="text"
                    value={assignment.marks}
                    name="marks"
                    onChange={AddAssignmentData}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3>Attach</h3>
              <div>
                <div>
                  <div className="Imgbx">
                    <img src={youtube} alt="Youtube" />
                  </div>
                  <div className="file_field">
                    <label>Video Link</label>
                    <input
                      type="text"
                      value={assignment.v_link}
                      name="v_link"
                      onChange={AddAssignmentData}
                    />
                  </div>
                </div>
                <div>
                  <div className="Imgbx">
                    <img src={link} alt="link" />
                  </div>
                  <div className="file_field">
                    <label>Add Link</label>
                    <input
                      type="text"
                      value={assignment.link}
                      name="link"
                      onChange={AddAssignmentData}
                    />
                  </div>
                </div>
                <div>
                  <div className="Imgbx">
                    <img src={UploadIcon} alt="icon" />
                  </div>
                  <div className="file_field">
                    <label htmlFor="syllabus" className="uploadfile" >Upload Image/Video/File</label>
                    <input
                      type="file"
                      // value={file}
                      name="file"
                      id="syllabus"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="Formbutton"
              
            >
              Assign
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};




export default AssignmentForm;
