import React from 'react'
import './style.css'
import Img from './Img'
import Content from './Content'
import img1 from '../../Images/herosec1.png'
const Container = (props) => {
  return (
    <div className='hero-section'>
      <div className='left-side'>
        {props.props1}
      </div>
      <div className='right-side'>
        {props.props2}
      </div>
    </div>
  )
}

export default Container