import React from 'react'
import './SyllabusDownload.css';
import { FaDownload } from 'react-icons/fa';
import { TbDownload} from "react-icons/tb";
import { MdOutlineDownloadForOffline, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
const SyllabusDownload = (props) => {
  return (
    <div className='download_con'>
      <button><MdOutlineDownloadForOffline/>Download <MdOutlineKeyboardArrowUp/></button>
       <div className='download-links'>
         <ul>
          <li><a href={props.syllabus_link} download="Syllabus"><TbDownload/> Syllabus</a></li>
          <li><a href={props.syllabus_link} download="book"><TbDownload/> Book</a></li>
         </ul>
        
       </div>
       
       {/* <button><TbDownload/>Download</button> */}
      
    </div>
  )
}

export default SyllabusDownload