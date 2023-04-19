import React, { useState } from "react";
import './TopicForm.css'
import Cookies from 'js-cookie';
import axios from "axios";
import youtube from '../../Images/YouTube.png'
import UploadIcon from '../../Images/UploadIcon.png';
import link from '../../Images/Link.png'
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from 'react-quill'
import '../../../node_modules/react-quill/dist/quill.snow.css';
// import { showHide } from "../../features/Reducer";

axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const modules = {
    toolbar: [
        [{ header: "1"}, {header:"2"}, {header:[3,4,5,6]}],
        [{size:[]}],
        ["bold","italic","underline","blockquote"],
        [{list: "odered"},{list:"bullet"}],
        ["code-block"],
    ],
};
const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "blockquote",
    "odered",
    "bullet",
    "code-block",
];

const TopicForm = (props) => {
    const [Topic, setTopic] = useState(
        {
            subtopic_name: "",
            link: "",
            v_link: "",
        }
    );
    const [notes , setNotes] = useState('')
    const [file , setFile] = useState(null)
    const handleChange = (e) =>{
        setNotes(e)
    }
    const AddTopic = (e) => {
        const { name, value } = e.target;
        setTopic((predata) => {
            return {
                ...predata,
                [name]: value
            }
        })
    }
    const createTopic = async () => {
        let formData = new FormData();
        formData.append('subtopic_name' , Topic.subtopic_name)
        formData.append('link' , Topic.link)
        formData.append('notes' ,notes)
        formData.append('v_link' ,Topic.v_link)
        formData.append('file' , file)
        formData.append('unit_id' , '643fbd6f457b54d986798334')
        try {
            console.log(formData)
            console.log(Topic)
            console.log(file)
            console.log(notes)
            const response = await axios.post(
                `http://127.0.0.1:8000/content/addsubtopic`,
                
                    // subtopic_name: Topic.subtopic_name,
                    // link: Topic.link,
                    // notes: Topic.notes,
                    // v_link:Topic.Youtube,
                    // file:file,
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
        } catch (err) {
            console.error(err);
        }

    };
    return (
        <div className="TopicForm_Container">
            <div className="Topicform_Wrapper">
                <div className="addtopic">
                    <h2>Add New Topic</h2>
                    <button className="crossbtn2">
                        <FaTimes />
                    </button>
                </div>
                <div className="form_container">
                    <form action="#" className="TopicForm">
                        <div>
                            <label>Enter Topic Name</label>
                            <input
                                type="text"
                                value={Topic.subtopic_name}
                                name="subtopic_name"
                                onChange={AddTopic}
                            />
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
                                            value={Topic.v_link}
                                            name="v_link"
                                            onChange={AddTopic}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="Imgbx">
                                        <img src={link} alt="link"/>
                                    </div>
                                    <div className="file_field">
                                        <label>Add Link</label>
                                        <input
                                            type="text"
                                            value={Topic.link}
                                            name="link"
                                            onChange={AddTopic}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="Imgbx">
                                        <img src={UploadIcon} alt="icon"/>
                                    </div>
                                    <div className="file_field">
                                        <label htmlFor="syllabus" className="uploadfile" >Upload Image/Video/File</label>
                                        <input
                                            type="file"
                                            // value={file}
                                            name="file"
                                            id="syllabus"
                                            onChange={(e)=>setFile(e.target.files[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="notes">
                            <label>Add Notes</label>
                            <ReactQuill
                            //    theme="snow" 
                               modules={modules}
                               formats={formats}
                               value={notes}
                               onChange={handleChange}
                            />
                        </div>
                        <button
                            type="button"
                            className="Formbutton"
                            onClick={createTopic}
                        >
                            Create Topic
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};




export default TopicForm;
