import React from 'react'
import './Container.css';
import cs from '../../Images/CSSVG.svg';
const Container = (props) => {
  const branch_name = props.branch === 'CS' ? 'Computer Science Engineering' : props.branch === 'CE' ? 'Civil Engineering'  :   props.branch === 'ME' ? 'Mechanical Engineering' : props.branch === 'ET' ? 'Electronics and Communication Engineering' : props.branch === 'ET' ? 'Electronics and Communication Engineering' : props.branch === 'EE' ? 'Electrical and Electronics Engineering' : ''
  return (
    <div className='branchHero_con'>
        <div className='ImgBx'>
           <img src={cs}/>
        </div>
        <div className='heading'>
            <h1>{branch_name}</h1>
        </div>
    </div>
  )
}

export default Container