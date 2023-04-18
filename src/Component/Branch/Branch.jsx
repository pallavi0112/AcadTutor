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

useEffect(() => {
  console.log("semester data",semesterData);

}, [semesterData]);

return (
  <div className='branch'>
    <Container branch={branch} />
    {semesterData.map((val , index) =>{
       return   index%2 == 0 ? <Semester subData={val.sub} sem={index + 1} fade="fade-up-right" key={index} />: <Semester subData={val.sub} sem={index + 1} fade="fade-up-left" key={index} />
    })}
  </div>
)
}

export default Branch