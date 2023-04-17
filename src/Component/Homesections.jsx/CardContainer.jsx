import React from 'react'
import Card from './Card';
import CS from '../../Images/CSE.png'
import Civil from '../../Images/Civil.png'
import Mechanical from '../../Images/Mechanical.png'
import Electrical from '../../Images/Electrical.png'
const CardContainer = () => {
  return (
    <div className='card-container'>
        <Card
           title="Computer Science"
           img={CS}
        /> 
        <Card
          title="Mechanical"
          img={Mechanical}
        /> 
        <Card 
          title="Civil"
          img={Civil}
        /> 
        <Card
          title="Electrical and Electronics "
          img={Electrical}
        /> 
    </div>
  )
}

export default CardContainer;