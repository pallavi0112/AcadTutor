import React, { useState } from "react";
import './CourseForm.css'
import Cookies from 'js-cookie';
import axios from "axios";
import CourseFormImg from '../../Images/CourseFormImg.png';
import UploadIcon from '../../Images/UploadIcon.png';
import { CreateCourse } from "../../features/teacher/CreateCourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";



const CourseForm = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState(
        {
            subj_name: "",
            branch: "",
            sem: "",
            summary: "",
            date: "",
        }
    );
    const [sfile, setSfile] = useState(null);
    const [imgfile, setImgfile] = useState(null);
    const [bfile, setBfile] = useState(null);

    const AddCourse = (e) => {
        const { name, value } = e.target;
        setCourse((predata) => {
            return {
                ...predata,
                [name]: value
            }
        })
    }
    const createcourse = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('s_file', sfile)
        formData.append('b_file', bfile)
        formData.append('img_file', imgfile)
        formData.append('subj_name', course.subj_name)
        formData.append('branch', course.branch)
        formData.append('sem', course.sem)
        formData.append('summary', course.summary)
        formData.append('date', course.date)

        try {

            const response = await axios.post(
                `http://127.0.0.1:8000/content/addsubj`,
                formData
                ,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRFToken": Cookies.get('csrftoken')

                    },
                },
            );
            console.log({ BACKEND_RESPONSE: response.data });
            console.log({ BACKEND_RESPONSE: response.data.subject_id });
            console.log({ BACKEND_RESPONSE: response.status });
            console.log(formData)
            if(response.status === 200){
                setCourse(
                    {
                        subj_name: "",
                        branch: "",
                        sem: "",
                        summary: "",
                        date: "",
                    }
                )
                setBfile(null)
                setImgfile(null)
                setSfile(null)
                navigate("/teacher/dashboard/courses")

                window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }

    };


    return (
        <div className="CourseForm_Container">
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
                    <form className="CourseForm" onSubmit={createcourse}>
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                value={course.subj_name}
                                name="subj_name"
                                onChange={AddCourse}
                            // onChange={(e) => setFormData({ ...formData, subj_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="branch">Branch</label>
                            <select id="branch"
                                value={course.branch}
                                name="branch"
                                onChange={AddCourse}>
                                <option value=""></option>
                                <option value="cse">Computer Science</option>
                                <option value="eee">Electrical & Electronics</option>
                                <option value="et&t">Elecetronics & Telecommunications</option>
                                <option value="ce">Civil</option>
                                <option value="me">Mechanical</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="semester">Semester</label>
                            <select id="semester"
                                value={course.sem}
                                name="sem"
                                onChange={AddCourse}>
                                <option value=""></option>
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                <option value="3">3rd</option>
                                <option value="4">4th</option>
                                <option value="6">6th</option>
                                <option value="7">7th</option>
                                <option value="8">8th</option>
                            </select>
                        </div>
                        <div>
                            <label>Start Date</label>
                            <input
                                type="Date"
                                value={course.date}
                                name="date"
                                onChange={AddCourse}
                            // onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div className="file">
                            <label htmlFor="syllabus" className="uploadfile" >Upload Syllabus<img src={UploadIcon} /></label>
                            <input
                                type="file"
                                // value={sfile}
                                name="s_file"
                                id="syllabus"
                                onChange={(e) => setSfile(e.target.files[0])}
                            />
                        </div>

                        <div>
                            <label htmlFor="book" className="uploadfile" >Upload Subject Book <img src={UploadIcon} /></label>
                            <input
                                type="file"
                                // value={bfile}
                                name="b_file"
                                onChange={(e) => setBfile(e.target.files[0])}
                                id="book"
                            />
                        </div>
                        <div>
                            <label htmlFor="img" className="uploadfile" >Upload Subject Image <img src={UploadIcon} /></label>
                            <input
                                type="file"
                                // value={imgfile}
                                name="img_file"
                                onChange={(e) => setImgfile(e.target.files[0])}
                                id="img"
                            />
                        </div>
                        <div className="description">
                            <label>Description</label>
                            <textarea
                                type="textarea"
                                value={course.summary}
                                name="summary"
                                onChange={AddCourse}
                            />
                        </div>
                        <button
                            type="submit"
                            className="Formbutton"
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
