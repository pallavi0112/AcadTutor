import React from 'react'

const Doubts = () => {
  const viewProfile = () =>{

  }
  const deleteComment = () =>{
    
  }
  return (
      <div className="student-details">
        <img className="profile-picture" src="profile_picture_url" alt="Profile Picture" />
        <div className="student-name">Student Name</div>
        <div className="commented-on">
          <span className="subject">Subject</span>
          <span className="interpunct">·</span>
          <span className="unit-number">Unit Number</span>
          <span className="interpunct">·</span>
          <span className="time-ago">Hours Ago</span>
        </div>
        <div className="more-options">
        <button className="more-options-button">&#8230;</button>
        <div className="more-options-dropdown">
        <div className="dropdown-option" onClick={() => viewProfile()}>View Profile</div>
        <div className="dropdown-option" onClick={() => deleteComment()}>Delete Comment</div>
        </div>
        <div className="comment-section">
          <textarea className="comment-textarea" placeholder="Reply"></textarea>
          <button className="submit-comment">Submit</button>
        </div>
        </div>
      </div>


  )
}

export default Doubts