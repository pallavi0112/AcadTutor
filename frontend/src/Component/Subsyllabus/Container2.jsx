import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Subsyllabus.css';
import axios from "axios";

const Container2 = (props) => {
  const {subject_id} = useParams()
 
  const [profile, setProfile] = useState(
    {
        name: "",
        branch: "",
        designation: "",
        about: "",
        youtube: "",
        linkedin: ""
    }
  );
  const [ProfilePic , setPP] = useState("")

useEffect(()=>{
  const GetProfile = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/accounts/get_profile`);
        const data = response.data
        console.log(data)
        setProfile({
            name: data.name,
            branch: (data.branch)?data.branch:"",
            designation: data.designation,
            about: data.about,
            youtube: data.youtube,
            linkedin: data.linkedin
        })
        setPP(data.profilePic)

    } catch (error) {
        console.error(error)
    }
}
GetProfile()
},[])  
console.log(subject_id)
  return (
    <div className='sub_con'>
      <h3>About the Subject</h3>
      <div className='row'>
      <div className='ImgBx'>
          <img src={props.img}/>
      </div>
      <div className='sub_detail'>
       {props.summary}
      </div>
      </div>
      <h3>Teacher In Charge</h3>
      <div className='teacher-info'>
        <img src={ProfilePic} alt='teacher-pic'/>
        <div>
        <h4>{profile.name}</h4>
        <span>{profile.branch} Department</span>
        </div>
      </div>
    </div>
  )
}

export default Container2