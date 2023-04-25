import React from 'react'
import './SDashboard.css'
import { TbSend } from "react-icons/tb";
const SDoubt = () => {
    const viewProfile = () => {

    }
    const deleteComment = () => {

    }
    return (
        <div className='student-doubt-section'>
            <div className="student-details">
                <img className="profile-picture" src="profile_picture_url" alt="Profile Picture" />
                <div>
                    <h4 className="student-name">B Rahul</h4>
                    <div className="commented-on">
                        <span>Commented on</span>
                        <span className="subject">Subject</span>
                        <span className="unit-number">unit 1</span>
                        <span className="interpunct">·</span>
                        <span className="time-ago">time</span>
                    </div>
                    <div className='ques-ans'>
                        dfhlsedoighldifjkvnlSOfsefdnsjvfurhsgvndsjkigowasjnlzxlcxkhsiefdnjsvkiogjvkxdnligfjedkfindgregjndgvalfkhiawnskcazsfdsmgldlrighd
                    </div>
                </div>
            </div>
            <div className="doubt-reply">
                <img className="profile-picture" src="profile_picture_url" alt="Profile Picture" />
                <div>
                    <h4 className="teacher-name">Shanu K Rakesh</h4>
                    <div className="commented-on">
                        <span>Replied on</span>
                        <span className="subject">Subject</span>
                        <span className="unit-number">unit 1</span>
                        <span className="interpunct">·</span>
                        <span className="time-ago">time</span>
                    </div>
                    <div className='ques-ans'>
                        dfhlsedoighldifjkvnlSOfsefdnsjvfurhsgvndsjkigowasjnlzxlcxkhsiefdnjsvkiogjvkxdnligfjedkfindgregjndgvalfkhiawnskcazsfdsmgldlrighd
                    </div>
                    <div className="comment-section">
                        <input className="comment-textarea" placeholder="Reply"/>
                        <button className="submit-comment"><TbSend/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SDoubt