import React, { useState } from 'react'
import './Subsyllabus.css';
import { TbDownload } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { AddUnitShowHide} from '../../features/Reducer';
import { useDispatch , useSelector} from 'react-redux';
const UnitBtn = (props) => {
  const dispatch = useDispatch()
  const usertype = useSelector((state) => state.auth.user)
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {
        usertype === "student"
        ? <div className="download-button">
          <button
            className="button"
            style={{ backgroundColor: '#ff9900' }}
            onClick={handleDropdown}
          >
            Downloads
            {
              isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
  
            }
          </button>
          {isOpen && (
            <ul className="dropdown">
              <li><a href={props.syllabus_link} download="Syllabus"><TbDownload /> Syllabus</a></li>
              <li><a href={props.book_link} download="book"><TbDownload /> Book</a></li>
            </ul>
          )}
        </div>
        :
        <div className='unitbtn'>
        <button onClick={()=>dispatch(AddUnitShowHide(true))}>Add Unit <HiOutlinePencilSquare/></button>
        </div>
      }

    </>

 

  )
}


export default UnitBtn