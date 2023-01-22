import React, {useEffect, useState} from 'react'
import ReactPlayer from 'react-player/youtube'
import './UnitContent.css'
import axios from "axios";
import { useLocation } from 'react-router-dom';
const UnitContent = () => {
  const [topics , setTopics] = useState([])
  const [u_name , setU_name] = useState("")
  const navigate = useLocation()
  const path = navigate.pathname;
  const patharray = path.split("/")
  const unit_id = patharray[patharray.length - 1];
useEffect(()=>{
  const GetContent = async (unit_id) => { 
    try { 
      const response = await axios.get(
        `http://127.0.0.1:8000/content/${unit_id}/get_unit`,{'withCredentials': true }
      ); 
      const data = response.data.subtopics
      setU_name(response.data.u_name)
      setTopics(data) 
      console.log('data : ' , response.data)
      console.log(data)
      
    } catch (err) {
      console.error(err);
      alert(err)
    }
  };
 
  GetContent(unit_id);
},[])
console.log('topics' ,topics)
topics.map((obj)=>{
  console.log(obj.subtopic_name)
})
useEffect(()=>{

},[topics])
 
  return (
    <div className='contents_container'>
      <div class="topics">
        <h2>{u_name}</h2>
        <ul>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
          <li class="Array active_topic">Array</li>
          <li class="Matrix">Matrix</li>
          <li class="String">String</li>
        </ul>
      </div>
      <div class="rightcont">
        <div id='Array' className='video_note'>
          <div className='yt_video'>
            <ReactPlayer url='https://www.youtube.com/watch/emLHiV_QKTg0&list=PL3R9-um41JszlOtyQCWIy0WQNm30y3NMN' />
          </div>
          <div className='notes_container'>
            <h2>Notes</h2>
            <div className='note'>
              "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and
              I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth,
              the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself,
              because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that
              are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,
              but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example,
              which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault
              with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos
              qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
              sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem
              ullam corporis suscipit laboriosam, nisi ut
              aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
              vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UnitContent