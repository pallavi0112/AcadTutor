import React from 'react'
import './Subsyllabus.css';
import HOD from '../../Images/HOD.jpg'
const Container2 = (props) => {
  return (
    <div className='sub_con'>
      <h3>About the Subject</h3>
      <div className='row'>
      <div className='ImgBx'>
          <img src={props.img}/>
      </div>
      <div className='sub_detail'>
       {props.summary}
      </div>
      </div>
      <h3>Teacher In Charge</h3>
      <div className='teacher-info'>
        <img src={HOD} alt='teacher-pic'/>
        <div>
        <h4>Dr. Shanu K Rakesh</h4>
        <span>CSE Department</span>
        </div>
      </div>
    </div>
  )
}

export default Container2