import React, { useState } from "react";
import './CourseForm.css'
import Cookies from 'js-cookie';
import axios from "axios";
import CourseFormImg from '../../Images/CourseFormImg.png';
import UploadIcon from '../../Images/UploadIcon.png';
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const CourseForm = () => {
    const [course, setCourse] = useState(
        {
            subj_name: "",
            branch: "",
            sem: "",
            summary: "",
            syllabus: "",
            book: "",
            date: "",
            weightage: "",
        }
    );
    const AddCourse = (e) => {
        const { name, value } = e.target;
        setCourse((predata) => {
            return {
                ...predata,
                [name]: value
            }
        })
    }
    const createcourse = async () => {
        try {

            const response = await axios.post(
                `http://127.0.0.1:8000/content/addsubj`,
                {
                    subj_name: course.subj_name,
                    // branch: course.branch,
                    sem: course.sem,
                    summary: course.summary,
                    weightage:course.weightage,
                    date:course.date,
                    // b_file:course.book,
                    // s_file:course.syllabus,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRFToken": Cookies.get('csrftoken')

                    },
                },
            );
            console.log({ BACKEND_RESPONSE: response });
        } catch (err) {
            console.error(err);
        }

    };
    return (
        <div className="CourseForm_Container">
            <h2>Create Course</h2>
            <div className="Courseform_Wrapper">
                <div className="left_side">
                    <div className="quote_bx">
                        <p><q>A Good Teacher is like a candle- It consumes itself to light the way for others.</q></p>
                        <blockquote>~Mustafa Kemal Atatürk</blockquote>
                    </div>
                    <div className="Imgbx">
                        <img src={CourseFormImg} alt="quote Image"></img>
                    </div>
                </div>
                <div className="right_side">
                    <form action="#" className="CourseForm">
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                value={course.subj_name}
                                name="subj_name"
                                onChange={AddCourse}
                            />
                        </div>
                        <div id="row_col_area">
                            <div>
                               <div>
                                <label>Branch</label>
                                <input
                                    type="text"
                                    value={course.branch}
                                    name="branch"
                                    onChange={AddCourse}
                                />
                               </div>
                               <div>
                                <label>Semester</label>
                                <input
                                    type="text"
                                    value={course.sem}
                                    name="sem"
                                    onChange={AddCourse}
                                />
                               </div>
                            </div>
                            <div>
                               <div>
                                <label for="syllabus" className="uploadfile" >Upload Syllabus<img src={UploadIcon}/></label>
                                <input
                                    type="file"
                                    value={course.syllabus}
                                    name="syllabus"
                                    id="syllabus"
                                    onChange={AddCourse}
                                />
                               </div>
                               <div>
                                <label>Start Date</label>
                                <input
                                    type="Date"
                                    value={course.date}
                                    name="date"
                                    onChange={AddCourse}
                                />
                               </div>
                            </div>
                            <div>
                            <div>
                                <label for="book" className="uploadfile" >Upload Book <img src={UploadIcon}/></label>
                                <input
                                    type="file"
                                    value={course.book}
                                    name="book"
                                    onChange={AddCourse}
                                    id="book"
                                />
                            </div>
                            <div>
                                <label>Weightage</label>
                                <input
                                    type="text"
                                    value={course.weightage}
                                    name="weightage"
                                    onChange={AddCourse}
                                />
                            </div>
                            </div>
                        </div>
                        <div className="description">
                            <label>Description</label>
                            <input
                                type="textarea"
                                value={course.summary}
                                name="summary"
                                onChange={AddCourse}
                            />
                        </div>
                        <button
                            type="button"
                            className="Formbutton"
                            onClick={createcourse}
                        >
                            Create Course
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;
