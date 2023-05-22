import React, { useState } from 'react'
import './Assignment.css'
import { FaArrowCircleDown, FaArrowAltCircleUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import AnnouncementList from './AnnouncementList'
import { MdNoMealsOuline } from 'react-icons/md'
import ReactQuill from 'react-quill'
import '../../../node_modules/react-quill/dist/quill.bubble.css';
import '../../../node_modules/react-quill/dist/quill.snow.css';
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
const Announcment = () => {
  const { user } = useSelector((state) => state.auth)
  const [isbtnshow, setIsBtnShow] = useState(false)
  const [annoucement, setAnnucement] = useState('')
  return (
    <div className='annuncement-container'>
      <div className='announcement-header'>
        <h3>Announcement</h3>
        {
          !isbtnshow ? <FaArrowCircleDown onClick={() => { setIsBtnShow(true) }} /> : <FaArrowAltCircleUp onClick={() => { setIsBtnShow(false) }} />
        }
      </div>
      {
        isbtnshow ?
          <div className='announcement-form-list'>
            {
              user === "teacher" ? isbtnshow ?
                <div className='create-announcement'>
                  <form>
                    <ReactQuill
                      theme={"snow"}
                      modules={modules}
                      formats={formats}
                      readOnly={true}
                      value={annoucement}
                      onChange={(e) => setAnnucement(e.target.value)}
                    />
                    <button
                      type="button"
                      className="Formbutton"
                    >
                      Assign
                    </button>
                  </form>
                </div> : null : null
            }
            <div className='announcement-list-container'>
              <h3>All annuncements</h3>
              <div>
                <AnnouncementList />
              </div>
            </div>
          </div>
          :
          null
      }

    </div>
  )
}

export default Announcment