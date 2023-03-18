import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player/youtube'
import './UnitContent.css'
import axios from "axios";
import { useLocation } from 'react-router-dom';
const UnitContent = () => {
  const [topics , setTopics] = useState([])
  const [u_name , setU_name] = useState("")
  const [yt_link , setYt_link] = useState("")
  const [notes , setnotes] = useState("")

  const navigate = useLocation()
  const path = navigate.pathname;
  const patharray = path.split("/")
  const unit_id = patharray[patharray.length - 1];
useEffect(()=>{
  const GetSubjectTopics = async (unit_id) => { 
    try { 
      const response = await axios.get(
        `http://127.0.0.1:8000/content/${unit_id}/get_unit`,{'withCredentials': true }
      ); 
      const data = response.data.subtopics
      setU_name(response.data.u_name)
      setTopics(data) 
      const head = data[0].subtopic_id;
      try { 
        const response = await axios.get(
          `http://127.0.0.1:8000/content/${head}/get_subtopic`,{'withCredentials': true }
        ); 
        const data = response.data
        // console.log(data.video_link[0],"headd")
        setYt_link(data.video_link[0])
        setnotes(data.notes)         
      } catch (err) {
        console.error(err);
        alert(err)
      }
    }
     catch (err) {
      console.error(err);
      alert(err)
    }
  };
  GetSubjectTopics(unit_id);
},[])

// useEffect(()=>{
 
  
// },[head])
const GetSubtopic = async (subtopic_id) => { 

  try { 
    const response = await axios.get(
      `http://127.0.0.1:8000/content/${subtopic_id}/get_subtopic`,{'withCredentials': true }
    ); 
    const data = response.data;
  
    console.log('data : ' , response.data)
    setYt_link(data.video_link[0])
    setnotes(data.notes)
  } catch (err) {
    console.error(err);
    alert(err)
  }
};
  return (
    <div className='contents_container'>
      <div className="topics">
        <h2>{u_name}</h2>
      <ul>
          {topics.map((val , index)=>{
            return <li class="Array active_topic" onClick={()=>GetSubtopic(val.subtopic_id)}><a>{val.subtopic_name}</a></li>
          })
          }
      </ul>
          
      </div>
      <div class="rightcont">
        <div id='Array' className='video_note'>
          <div className='yt_video'>
            <ReactPlayer
            controls={true}
            id='player'
            disableDeferredLoading={true}
            url={yt_link} />
            {/* {yt_link} */}
          </div>
          <div className='notes_container'>
            <h2>Notes</h2>
            <div className='note'>
              {notes}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UnitContent