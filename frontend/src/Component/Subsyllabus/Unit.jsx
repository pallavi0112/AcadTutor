import React,{useState} from 'react'
import './Unit.css'
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import {FaRegPlayCircle} from 'react-icons/fa';

axios.defaults.withCredentials = true;


const Unit = () => {
  const [topics , setTopics] = useState([
    {
      "topic_name" : "",
      "link" : "",
      "notes" : ""
    }
  ])

  const GetUnits = async (unit_id) => { 
    try { 
      const response = await axios.get(
        `http://127.0.0.1:8000/content/${unit_id}/get_unit`,{'withCredentials': true }
      ); 
      const data = response.data.subtopics
      console.log(data)
      data.map((object) => {
        console.log(`objects : ${object.subtopic_name}`)
        setTopics((topics) => [
          ...topics,
          {
            topic_name: object.subtopic_name,
            link: object.link,
            notes: object.notes,
          }
        ]);
      }); 
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className='unit_con'>
    <span>unit-1 introduction</span>
    <Link to=''><button type='button' onClick={()=> GetUnits("638de9462f72b8c1a32682aa")}><FaRegPlayCircle/>Start Learning</button></Link>
    </div>
  )
}

export default Unit