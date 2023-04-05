import React from 'react'
import features1 from '../../Images/Features1.png'
import features2 from '../../Images/Features2.png'
import FeaturesCard from './FeaturesCard'
import FeatureImg from './FeatureImg'
const Features = () => {
  return (
    <div className='features-container'>
        <FeatureImg/>
        <div className='heading-cont'>
             <h1 className='title'>Key <strong className='strong'>Features</strong> of Our Platform </h1>
         </div>
    </div>
  )
}

export default Features