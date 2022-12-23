import React, {useEffect} from 'react'
import './Trashing.css'
import {FaChevronRight, FaPassport} from  'react-icons/fa'
import { useLocation, useNavigate, useParams } from 'react-router-dom' ; 


const Trashing = () => {
    const navigate = useLocation()
    const path = navigate.pathname;
    const patharray = path.split("/")
    console.log(navigate)
    console.log(path)
    console.log(patharray)
  return (
    <div className='location_container'>
        {
          patharray.map((val , index)=>{
                if(index == 0)
                    return null
                else
                    return <><a href='/' key={index}>{val}</a><FaChevronRight/></>
          })
        }
    </div>
  )
}

export default Trashing;