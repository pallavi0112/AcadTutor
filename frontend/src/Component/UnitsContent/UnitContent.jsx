import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player/youtube'
import './UnitContent.css'
import axios from "axios";
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { ReactTinyLink } from "react-tiny-link";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillPlusCircle } from "react-icons/ai";
import { AddTopic } from '../../features/Reducer';
import Parser from 'html-react-parser';
axios.defaults.withCredentials = true
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const UnitContent = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [topics, setTopics] = useState([])
  const [u_name, setU_name] = useState("")
  const [yt_link, setYt_link] = useState("")
  const [notes, setnotes] = useState("")
  const [file, setFile] = useState("")
  const [url, setUrl] = useState(null)

  const navigate = useLocation()
  const path = navigate.pathname;
  const patharray = path.split("/")
  const unit_id = patharray[patharray.length - 1];
  useEffect(() => {
    const GetSubjectTopics = async (unit_id) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/content/${unit_id}/get_unit`, { 'withCredentials': true }
        );
        const data = response.data.subtopics
        console.log(response, "data")
        setU_name(response.data.u_name)
        setTopics(data)
        console.log(data[0], "link")
        const head = data[0].subtopic_id;
        console.log(head)
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/content/${head}/get_subtopic`, { 'withCredentials': true }
          );
          const data = response.data
          console.log(response, "response")
          console.log(data.link[0], "link")
          setYt_link(data.video_link[0])
          setnotes(data.notes)
          setUrl(data.link[0])
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
  }, [])

  const GetSubtopic = async (subtopic_id) => {

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/content/${subtopic_id}/get_subtopic`, { 'withCredentials': true }
      );
      const data = response.data;

      console.log('data : ', response.data)
      setYt_link(data.video_link[0])
      console.log(data.link, "link")
      setnotes(data.notes)
      setUrl(data.link[0])
    } catch (err) {
      console.error(err);
      alert(err)
    }
  };
  console.log(url, "url")
  return (
    <div className='contents_container'>
      <div className='topics_cont'>
        <div className="topics">
          <div className='topic-heading'>
            <h2>{u_name}</h2>
          </div>
          <div>
            {
              user === "teacher" ? <button type='button' style={{ backgroundColor: "#000", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", padding: "0.5rem 1rem", marginTop: "0.5rem", cursor: "pointer" }} onClick={() => dispatch(AddTopic(true))}>Add Topic <AiFillPlusCircle /></button> : null
            }
          </div>
          <ul>
            {topics.map((val, index) => {
              return <li class="Array active_topic" onClick={() => GetSubtopic(val.subtopic_id)} key={index}><a>Video {index + 1}:{val.subtopic_name}</a></li>
            })
            }
          </ul>

        </div>
      </div>
      <div className="rightcont">
        <div id='Array' className='video_note'>
          <div className='yt_video'>
            <ReactPlayer
              controls={true}
              id='player'
              disableDeferredLoading={true}
              url={yt_link} />
          </div>
          <div className='notes_container'>
            <h2>Notes</h2>
            <div className='note'>
              {Parser(notes)}

            </div>
            {/* <LinkPreview url="https://www.amazon.com/Steve-Madden-Mens-Jagwar-10-5/dp/B016X44MKA/ref=lp_18637582011_1_1?srs=18637582011&ie=UTF8&qid=1550721409&sr=8-1"
              width='400px'
            /> */}
            <ReactTinyLink
              cardSize="small"
              showGraphic={true}
              maxLine={2}
              minLine={1}
              url="https://www.amazon.com/Steve-Madden-Mens-Jagwar-10-5/dp/B016X44MKA/ref=lp_18637582011_1_1?srs=18637582011&ie=UTF8&qid=1550721409&sr=8-1"
            />
  
          </div>
        </div>

      </div>
    </div>
  )
}

export default UnitContent