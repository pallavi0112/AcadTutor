import React, { useState } from 'react'
import './SDashboard.css'
const Profile = () => {
    const [savebtn, setSaveBtn] = useState(false)
    const [active, setActive] = useState(false)
    const [pswdshow, setPswdshow] = useState(false)
    const [emailshow, setEmailshow] = useState(false)
    const UpdateHandler = () => {
        setSaveBtn(true)
        setActive(true)
    }
    const SaveHandler = () => {
        setSaveBtn(false)
        setActive(false)
        setPswdshow(false)
        setEmailshow(false)
    }
    return (
        <div className="profile-container">
            <div className='profile-header'>
                <h3>Account Settings</h3>
                {
                    savebtn ?
                        <button className="btn-save" onClick={SaveHandler}>Save Changes</button>
                        :
                        <button className="btn-update" onClick={UpdateHandler}>Update Profile</button>

                }
            </div>
            
            <form>
                <div className="form-group">
                    <label>Your Profile Picture </label>
                    <div className="profile-picture">
                        <img src="./images/profile.png" alt="Profile" />
                        <div className="profile-buttons">
                            <button className="btn-upload">Upload New</button>
                            <button className="btn-remove">Remove Profile Picture</button>
                        </div>
                    </div>
                </div>
                <div className='grid-container'>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" disabled={!active} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" disabled={!active} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="branch">Branch</label>
                        <select id="branch" disabled={!active}>
                            <option value=""></option>
                            <option value="cse">Computer Science</option>
                            <option value="eee">Electrical & Electronics</option>
                            <option value="et&t">Elecetronics & Telecommunications</option>
                            <option value="ce">Civil</option>
                            <option value="me">Mechanical</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="semester">Semester</label>
                        <select id="semester" disabled={!active}>
                            <option value=""></option>
                            <option value="1">1st</option>
                            <option value="2">2nd</option>
                            <option value="3">3rd</option>
                            <option value="4">4th</option>
                            <option value="6">6th</option>
                            <option value="7">7th</option>
                            <option value="8">8th</option>
                        </select>
                    </div>
                    <div className="password-box">
                        <label>Password</label>
                        {
                            pswdshow ?
                                <div className='grid-container'>
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        <input type="password" id="password" disabled={!active} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Confirm Password</label>
                                        <input type="password" id="password" disabled={!active} />
                                    </div>
                                </div>
                                :
                                <div>
                                    <button className="btn-change-password" onClick={() => setPswdshow(true)}>Change Password</button>
                                </div>

                        }

                    </div>

                    <div className="form-group email-box">
                        <label>Email Address </label>
                        {
                            emailshow ?
                                <div className='grid-container'>
                                    <div className="form-group">
                                        <label htmlFor="password">New Emaiil</label>
                                        <input type="email" id="password" disabled={!active} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Confirm email</label>
                                        <input type="email" id="password" disabled={!active} />
                                    </div>
                                </div> :

                                <div className='grid-container'>
                                    <p>Your Email Address is <span>user@gmail.com</span></p>
                                    <div>
                                        <button className="btn-change-email" onClick={()=>setEmailshow(true)}>Change Email</button>
                                    </div>
                                </div>
                        }

                    </div>

                    <div className="form-group about-box">
                        <label>About:</label>
                        <textarea
                            disabled={!active}
                            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
                        nunc libero. Donec pretium mollis ipsum, in bibendum nisl ultrices
                    vitae. Proin sagittis, lectus a facilisis fermentum, sem erat
                    scelerisque elit, in ultrices elit nisi at mi. Duis quis ex et nunc
                    elementum consectetur. Morbi blandit dolor magna, quis hendrerit
                        tellus volutpat sit amet."

                        />


                    </div>
                </div>
            </form>
        </div>
    )
}

export default Profile