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
  // const [data , setData] = useState({
  //     unit : '' ,
  //     u_name : '',
  //     subj_id : sub_id
  // })
  const [u_name , setU_name] = useState('')
  const [subj_id , setSubj_id] = useState(sub_id)
  const AddUnitHandler = async(e)=>{
      e.preventDefault()
      try {

        const response = await axios.post(
            `http://127.0.0.1:8000/content/addunit`,
            
              {
                u_name ,
                subj_id , 
              },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": Cookies.get('csrftoken')

                },
            },
        );
        console.log({ BACKEND_RESPONSE: response});
        if(response.status === 200){
            setU_name('')
            window.location.reload();
        }
       
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
            <input type='text' placeholder='Enter unit name' onChange={(e) => setU_name(e.target.value)} name='u_name'></input>
          </div>
          <button type='submit' className='Formbutton'>save</button>
        </form>
        </div>
      </div>
    </>
  )
}

export default AddUnitForm