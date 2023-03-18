import React from 'react'
import './Heading.css'
const Heading = (props) => {
  return (
    <h1 className='sub_heading'>{props.heading}</h1>
  )
}

export default Heading