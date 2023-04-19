import React from 'react'
import './Subsyllabus.css';
const Container2 = (props) => {
  return (
    <div className='sub_con'>
      <div className='row'>
      <div className='sub_detail'>
       {props.summary}
      </div>
      <div className='ImgBx'>
          <img src={props.img}/>
      </div>
      </div>
    </div>
  )
}

export default Container2