import React, { useEffect, useState } from 'react'
import Container from '../Component/Subsyllabus/Container';
import Container2 from '../Component/Subsyllabus/Container2';
import UnitBtn from '../Component/Subsyllabus/UnitBtn';
import Heading from '../Component/Subsyllabus/Heading';
import Unit from '../Component/Subsyllabus/Unit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Navbar2 from '../Component/Navbar/Navbar2';
import { useSelector } from 'react-redux';
import AddUnitForm from '../Component/Subsyllabus/AddUnitForm';
// import AddUnitBtn from '../Component/Subsyllabus/AddUnitBtn';
import TopicForm from '../Component/UnitsContent/TopicForm'
const Subject = () => {
  const {addtopic} = useSelector((state)=>state.showLoginSlice)
  const {addunitshowhide} = useSelector((state)=>state.showLoginSlice)
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
      {
        addtopic ? <TopicForm/> : ''
      }
      { 
        addunitshowhide ? <AddUnitForm/> : ''
      }     
      <Navbar2/>
      <Heading heading={subjectData.c_name}/>
      <Container2 summary={subjectData.summary} img={subjectData.img_link}/>
      <UnitBtn syllabus_link={subjectData.syllabus_link} book_link={subjectData.book_link} />
       
     {
       unit.map((val , index)=>{ 
        return <Unit unit_name={val.u_name} unit_id={val.unit_id} key={index} sub_id={sub_id}/>
      }) }
     
    

    </main>
  )
}

export default Subject