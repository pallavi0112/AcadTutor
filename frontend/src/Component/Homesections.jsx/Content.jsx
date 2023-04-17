import React from 'react'

const Content = (props) => {
  return (
    <div className='contentBx'>
        <h2 className='title'>{props.heading}</h2>
        <p className='content'>{props.content}</p>
        <button className='button'>{props.btn}</button>
    </div>
  )
}

export default Content