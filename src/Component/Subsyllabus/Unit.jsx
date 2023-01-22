import React,{useState} from 'react'
import './Unit.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import {FaRegPlayCircle} from 'react-icons/fa';
const Unit = (props) => {
  return (
    <div className='unit_con'>
    <span>unit-{props.id} {props.unit_name}</span>
    <Link to={`/cs/${props.sub_id}/${props.unit_id}`}><button type='button'><FaRegPlayCircle/>Start Learning</button></Link>
    </div>
  )
}

export default Unit