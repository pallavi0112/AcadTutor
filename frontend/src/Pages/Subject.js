import React, { useEffect, useState } from 'react'
import Container from '../Component/Subsyllabus/Container';
import Container2 from '../Component/Subsyllabus/Container2';
import SyllabusDownload from '../Component/Subsyllabus/SyllabusDownload';
import Heading from '../Component/Subsyllabus/Heading';
import Unit from '../Component/Subsyllabus/Unit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar2 from '../Component/Navbar/Navbar2';
const Subject = () => {
  const [subjectData, setSubjectData] = useState({})
  const [unit, setUnit] = useState([]);
  const navigate = useLocation()
  const path = navigate.pathname;
  const patharray = path.split("/")
  const sub_id = patharray[patharray.length - 1];
  console.log(sub_id)
  useEffect(() => {
    const GetSubjectData = async (sub_id) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/content/${sub_id}/get_subj`, { 'withCredentials': true }
        );
        
        setSubjectData(response.data)
        setUnit(response.data.units);

      } catch (err) {
        console.error(err);
      }
    };
    GetSubjectData(sub_id);
  }, []);
  unit.map((u)=>console.log(u));
  useEffect(()=>{
    console.log(subjectData)
  },[subjectData])


  return (
    <main>
      <Navbar2/>
      <Heading heading="Machine Learning"/>
      <Container />
      <Container2 summary={subjectData.summary} img={subjectData.img_link}/>
      <SyllabusDownload syllabus_link={subjectData.syllabus_link} book_link={subjectData.book_link} />
      {
      unit.map((val , index)=>{ 
        return <Unit unit_name={val.u_name} unit_id={val.unit_id} key={index} id={index+1} sub_id={sub_id}/>
      }) 
    }

    </main>
  )
}

export default Subject