import React from 'react'
import { FaPlus } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import {useSelector} from 'react-redux'
const NotesAnnounce = () => {
    const {user} = useSelector((state) => state.auth)
    return (
        <div>
            {
                user === "student" 
                ? <span>Test Performance Report</span>
                :   <span>Notes/Anouncements</span>
            }
            <div>
                <div className='notes_container'>
                    {/* <div className='ImgBx'><img src={PdfIcon} /></div> */}
                    <div className='notes'>
                        <span className='heading'>Compelete Assignment of Unit-01</span>
                        <span className='desc'>Last Date for Submission of Assignment</span>
                        <span className='date'>10 Dec 2022</span>
                    </div>
                    <div className='editIcon'><FaEllipsisV /></div>
                </div>
                <div className='notes_container'>
                    {/* <div className='ImgBx'><img src={PdfIcon} /></div> */}
                    <div className='notes'>
                        <span className='heading'>Compelete Assignment of Unit-01</span>
                        <span className='desc'>Last Date for Submission of Assignment</span>
                        <span className='date'>10 Dec 2022</span>
                    </div>
                    <div className='editIcon'><FaEllipsisV /></div>
                </div>
            </div>
          {
            user === "student"
            ?
             ''
            : <button
                type="button"
                className="Formbutton"
            >
                Add Notes<FaPlus />
            </button>
          }

            <div className='Visit_link'><a href='/'>View All Notes</a></div>
        </div>
    )
}

export default NotesAnnounce