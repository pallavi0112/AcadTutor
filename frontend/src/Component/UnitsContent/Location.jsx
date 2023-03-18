import React, {useEffect} from 'react'
import './Location.css'
import {FaChevronRight, FaPassport} from  'react-icons/fa'
import { useLocation } from 'react-router-dom' ; 


const Location = () => {
    const navigate = useLocation()
    const path = navigate.pathname;
    const patharray = path.split("/")
    const cond = patharray.length;
    console.log(navigate)
    console.log(path)
    console.log(cond)
  return (
    <div className='location_container'>
      <ul className='breadcrumb'>
        {
          patharray.map((val , index)=>{
                if(index == 0)
                    return null
                else if(index < cond-1)
                    return <><li key={index}><a href='/' className='link'>{val}</a><FaChevronRight/></li></>
                else
                    return <><li key={index}>{val}</li></>
          })
        }

      </ul>
    </div>
  )
}

export default Location;