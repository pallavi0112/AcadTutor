import React, { useState , useEffect } from 'react'
import './Subsyllabus.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { FaRegPlayCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { AiFillPlusCircle } from "react-icons/ai";
import { AddTopic , AddUnitId } from '../../features/Reducer';
import { useDispatch } from 'react-redux';
const Unit = (props) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const topicformstatus = useSelector((state) => state.showLoginSlice.topicformstatus)
  const [show , setShow] = useState(false)
  // console.log(topicformstatus)
  const BtnHandler = (unit_id) => {
    dispatch(AddTopic(true))
    dispatch(AddUnitId(unit_id))
    
    setShow(true)
  }
  return ( 
    <div className='unit_con'>
      <span>{props.unit_name}</span>
      {
        (user === "student")
          ? <Link to={`/cs/${props.sub_id}/${props.unit_id}`} ><button type='button' style={{ backgroundColor: "#000" }} onClick={()=>dispatch(AddUnitId(props.unit_id))}>Start Learning<FaRegPlayCircle /></button></Link>
          : !show ? <button type='button' style={{ backgroundColor: "#FF9900" }} onClick={() => BtnHandler(props.unit_id)}>Add Topic <AiFillPlusCircle /></button> : <Link to={`/cs/${props.sub_id}/${props.unit_id}`} ><button type='button' style={{ backgroundColor: "#000" }}>View Topics<FaRegPlayCircle /></button></Link>
      }



    </div>
  )
}

export default Unit