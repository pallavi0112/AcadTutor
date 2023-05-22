import React from 'react'
import Navbar2 from '../Component/Navbar/Navbar2'
import UnitContent from '../Component/UnitsContent/UnitContent'
import Location from '../Component/UnitsContent/Location'
import { useNavigate, useParams } from 'react-router-dom' ;
import { useSelector } from 'react-redux';
import TopicForm from '../Component/UnitsContent/TopicForm';
const ContentPage = () => {
  const {addtopic} = useSelector((state)=>state.showLoginSlice)
  const {location} = useParams()
  return ( 
    <section className='content_page'>
          {
        addtopic ? <TopicForm/> : null
      }
        <Navbar2/>
        <Location/>
        <UnitContent/>
    </section>
  )
}

export default ContentPage;