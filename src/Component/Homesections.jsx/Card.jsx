import React from 'react'
import { Link } from 'react-router-dom'
const Card = (props) => {
  return (
    <div className='deprt-card'>
         <img className="deprt-img" src={props.img} alt=''/>
         <h3 className='deprt-name'>{props.title}</h3>
        <div className='overlay-card'>
          <button className='button'><Link>Go to Subjects</Link></button>
        </div>
         
    </div>
  )
}

export default Card