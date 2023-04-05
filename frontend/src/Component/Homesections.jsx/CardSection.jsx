import React from 'react'
import CardContainer from './CardContainer'

const CardSection = () => {
  return (
    <div className='card-section'>
        <h2 className='title'> Discover <strong className='strong'>all the subjects</strong> at one place</h2>
        <p className='content'>Find the subjects you want to learn even from your previous semesters</p>
        <CardContainer/>
    </div>
  )
}

export default CardSection