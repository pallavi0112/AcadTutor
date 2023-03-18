import React from 'react'
import './SyllabusDownload.css';
import { FaDownload } from 'react-icons/fa';
const SyllabusDownload = (props) => {
  return (
    <div className='download_con'>
       <span>ML Syllabus Download</span>
       <a href={props.syllabus_link}  download="Syllabus
       "><button><FaDownload/>Download</button></a>
       {/* <a href="path_to_file" download="proposed_file_name">Download</a> */}
    </div>
  )
}

export default SyllabusDownload