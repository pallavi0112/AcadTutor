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
  const [show , setShow] = useState(false)


  useEffect(() => {
    const isViewTopicBtnVisible = localStorage.getItem(props.unit_id);
    console.log(isViewTopicBtnVisible , "isviewtopicbth")
    if (isViewTopicBtnVisible) {
      setShow(JSON.parse(isViewTopicBtnVisible));
    } 
  },[]);
 
  const BtnHandler = (unit_id) => {
    dispatch(AddTopic(true))
    dispatch(AddUnitId(unit_id))    
  }
  const AddUnitDetail = (unit_id , unit_name) => {
    console.log("addunitdetail is running")
    dispatch(AddUnitId(unit_id))
    localStorage.setItem("Unit_Name" , unit_name)
  }

  return ( 
    <div className='unit_con'>
    {console.log(props.unit_name)}
      <span>{props.unit_name}</span>
      {
        (user === "student")
          ? <Link to={`/cs/${props.sub_id}/${props.unit_id}`} ><button type='button' style={{ backgroundColor: "#000" }} onClick={()=>dispatch(AddUnitId(props.unit_id))}>Start Learning<FaRegPlayCircle /></button></Link>
          : show ? <Link to={`/cs/${props.sub_id}/${props.unit_id}`} ><button type='button' style={{ backgroundColor: "#000" }}  onClick={() => AddUnitDetail(props.unit_id , props.unit_name)} >View Topics<FaRegPlayCircle /></button></Link> : <button type='button' style={{ backgroundColor: "#FF9900" }} onClick={() => BtnHandler(props.unit_id)}>Add Topic <AiFillPlusCircle /></button>
            
      }
          {/* : (topicformstatus && show ) ? <Link to={`/cs/${props.sub_id}/${props.unit_id}`} ><button type='button' style={{ backgroundColor: "#000" }}>View Topics<FaRegPlayCircle /></button></Link> :  <button type='button' style={{ backgroundColor: "#FF9900" }} onClick={() => BtnHandler(props.unit_id)}>Add Topic <AiFillPlusCircle /></button> */}
    </div>
  )
}

export default Unit