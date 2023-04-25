import React, { useState } from 'react'
import './Subsyllabus.css'
import { FaTimes } from "react-icons/fa";
import { AddUnitShowHide } from "../../features/Reducer"
import {useSelector , useDispatch} from "react-redux"
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const AddUnitForm = () => {
  const navigate = useLocation()
  const path = navigate.pathname;
  const patharray = path.split("/")
  const sub_id = patharray[patharray.length - 1];
  console.log(sub_id)
  const dispatch = useDispatch()
  const {addunitshowhide} = useSelector((state)=>state.showLoginSlice)
  const [data , setData] = useState({
      unit : '' ,
      u_name : '',
      subj_id : sub_id
  })
  const AddData = (e) =>{
       const {name , value} = e.target ;
       setData((data)=>{
           return{
            ...data ,
            [name] : value
           }
       })
  }
  const AddUnitHandler = async(e)=>{
      e.preventDefault()
      try {

        const response = await axios.post(
            `http://127.0.0.1:8000/content/addunit`,
            
              data ,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get('csrftoken')

                },
            },
        );
        console.log({ BACKEND_RESPONSE: response});
       
    } catch (err) {
        console.error(err);
    }
  }
  return (
    <> 
      <div className="addunitForm_Container">
        <div className="addunitForm_Wrapper">
          <button className="crossbtn" onClick={()=>dispatch(AddUnitShowHide(false))} >
            <FaTimes />
          </button>
          <form onSubmit={AddUnitHandler}>
          <div>
            {/* <select name='unit' onClick={AddData}>
              <option value="">Choose unit</option>
              <option value="1">unit-I</option>
              <option value="2">unit-II</option>
              <option value="3">unit-III</option>
              <option value="4">unit-IV</option>
              <option value="5">unit-V</option>
            </select> */}
            <input type='text' placeholder='Enter unit name' onClick={AddData} name='u_name'></input>
          </div>
          <button type='submit' className='Formbutton'>save</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default AddUnitForm