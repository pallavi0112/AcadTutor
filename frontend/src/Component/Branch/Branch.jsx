import React, { useEffect, useState } from 'react'
import './Branch.css'
import Semester from '../Semester/Semester'
import Container from './Container'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const Branch = () => {
  const [semesterData, setSemesterData] = useState([
  ]
  )
  const navigate = useLocation()
  const path = navigate.pathname;
  const patharray = path.split("/")
  const branch = patharray[patharray.length - 1].toUpperCase();
  axios.defaults.withCredentials = true
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  useEffect(() => {
    const GetSemesterData = async (branch) => {
      console.log("function branch : " + branch)
      try {
        const response = await axios.get(
          `http://localhost:8000/content/${branch}/get_branch`,
        );
        console.log("response : " , response.data)
        console.log("HELLO",Cookies.get("csrftoken"))
        const sem = response.data.semester
        sem.map((object, index) => {
          const sub = object.subjects
          setSemesterData((item) => [
            ...item,
            {
              sub
            }
          ]);
        });

      } catch (err) {
  console.error(err);
}
    };
GetSemesterData(branch);
  }, [])
// setstate async type ka function hai isliye baad mein update hota hai isliye aisa print krr re, 
//aur jo do baar axios run ho ra hai
// vo stictmode ki vajah se hai 
useEffect(() => {
  console.log("semester data",semesterData);

}, [semesterData]);

return (
  <div className='branch'>
    <Container branch={branch} />
    {semesterData.map((val , index) =>{
       console.log("val : " , val.img_link)
       return  <Semester subData={val.sub} sem={index + 1} fade="fade-up-right" key={index} />
    })}
    {/* <Semester subData={props.subData} sem='7th' fade='fade-up-left' />
    <Semester subData={props.subData} sem='6th' fade="fade-up-right" />
    <Semester subData={props.subData} sem='5th' fade='fade-up-left' />
    <Semester subData={props.subData} sem='4th' fade="fade-up-right" />
    <Semester subData={props.subData} sem='3rd' fade='fade-up-left' />
    <Semester subData={props.subData} sem='2nd' fade="fade-up-right" />
    <Semester subData={props.subData} sem='1st' fade='fade-up-left' /> */}
  </div>
)
}

export default Branch