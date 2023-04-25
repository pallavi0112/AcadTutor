import React from 'react'
import UserIcon from '../../Images/UserIcon.png'
const Performance = () => {
  return (
    <div>
    <span>Students Performance</span>
    <div className='Performance_result_container'>
      <div className='Performance_container'>
        <div className='ImgBx'><img src={UserIcon} /></div>
        <div className='performance_by'>
          <span className='stu_name'>B Rahul</span>
          <span className='stu_rollno'>300202219014</span>
        </div>
        <div>
          <span className='range'>90%</span>
        </div>
      </div>
      <div className='saparation'></div>
      <div className='Performance_container'>
        <div className='ImgBx'><img src={UserIcon} /></div>
        <div className='performance_by'>
          <span className='stu_name'>Nishan Kumar</span>
          <span className='stu_rollno'>300202219030 </span>
        </div>
        <div>
          <span className='range'>90%</span>
        </div>
      </div>
      <div className='saparation'></div>
      <div className='Performance_container'>
        <div className='ImgBx'><img src={UserIcon} /></div>
        <div className='performance_by'>
          <span className='stu_name'>Pallavi Soldey</span>
          <span className='stu_rollno'>300202219031</span>
        </div>
        <div>
          <span className='range'>84%</span>
        </div>
      </div>
    </div>
    <div className='Visit_link'><a href='/'>View Result List</a></div>
  </div>
  )
}

export default Performance