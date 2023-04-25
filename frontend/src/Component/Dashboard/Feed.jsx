import React from 'react'
import UserIcon from '../../Images/UserIcon.png'
const Feed = () => {
  return (
    <div>
            <span>Students Feed</span>
            <div>
              <div className='feed_container'>
                <div className='ImgBx'><img src={UserIcon} /></div>
                <div className='feeds'>
                  <span className='name'>Nishan Kumar</span>
                  <div>
                    <span className='sub_name'>Doubt in ML : </span>
                    <span className='doubt'>What is KDD and SEMMA?</span>
                  </div>
                </div>
              </div>
              <div className='feed_container'>
                <div className='ImgBx'><img src={UserIcon} /></div>
                <div className='feeds'>
                  <span className='name'>Nishan Kumar</span>
                  <div>
                    <span className='sub_name'>Doubt in ML : </span>
                    <span className='doubt'>What is KDD and SEMMA?</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='Visit_link'><a href='/'>View All Doubts</a></div>
          </div>
  )
}

export default Feed