import React, { useState } from 'react'
import { BsFillArrowDownSquareFill , BsFillArrowUpSquareFill } from "react-icons/bs";
import ReactQuill from 'react-quill'
import '../../../node_modules/react-quill/dist/quill.snow.css';
const modules = {
    toolbar: [
        ["bold", "italic", "underline", "blockquote"],
        [{ list: "odered" }, { list: "bullet" }],      
    ],
};
const formats = [
    "bold",
    "italic",
    "underline",
    "blockquote",
    "odered",
    "bullet",
];
const AnnouncementContainer = () => {
    const [show , setShow] = useState(false)
    return (
        <div className='announcement-container'>
            <div>
                <h3>Announcement</h3>
                {show ? <button onClick={()=>setShow(false)}><BsFillArrowUpSquareFill/></button> : <button onClick={()=>setShow(true)}><BsFillArrowDownSquareFill/></button>}
            </div>
            <div className='create-announcement'>
                <div>
                    <ReactQuill
                        //    theme="snow" 
                        modules={modules}
                        formats={formats}
                        // value={notes}
                        // onChange={handleChange}
                    />
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default AnnouncementContainer