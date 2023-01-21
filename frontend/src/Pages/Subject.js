import React ,{useEffect,useState}from 'react'
import Container from '../Component/Subsyllabus/Container';
import Container2 from '../Component/Subsyllabus/Container2';
import SyllabusDownload from '../Component/Subsyllabus/SyllabusDownload';
import Unit from '../Component/Subsyllabus/Unit';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const Subject = () => {
  const [subjectData, setSubjectData] = useState([
  ]
  )
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
        console.log("response : " , response.data)
        setSubjectData(response.data)

      } catch (err) {
  console.error(err);
}
    };
GetSubjectData(sub_id);
  }, [])
  useEffect(() => {
    console.log("subject data",subjectData);
  
  }, [subjectData]);
  return (
    <main>
    <Container/>
    <Container2/>
    <SyllabusDownload/>
    <Unit/>
    <Unit/>
    <Unit/>
    <Unit/>
    <Unit/>
    </main>
  )
}

export default Subject