import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {AiFillYoutube} from 'react-icons/ai'
import './TSettings.css'
import axios from "axios";
import Cookies from 'js-cookie';
import { logout } from '../../features/users/authSlice'

const TSettings = () => {
    const [savebtn, setSaveBtn] = useState(false)
    const [active, setActive] = useState(false)
    const [pswdshow, setPswdshow] = useState(false)
    const [emailshow, setEmailshow] = useState(false)
    const [file , setFile] = useState(null)
    const [ProfilePic , setPP] = useState("https://acadtutor.blob.core.windows.net/acadtutor/6769264_60111.jpg")
    const [profile, setProfile] = useState(
        {
            name: "",
            branch: "",
            designation: "",
            about: "",
            youtube: "",
            linkedin: ""
        }
    );
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    const hiddenFileInput = React.useRef(null);
    axios.defaults.withCredentials = true
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    const handleClick = (e) => {
        e.preventDefault();
        hiddenFileInput.current.click();
    }
    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        setFile(fileUploaded);
        setPP(URL.createObjectURL(fileUploaded));
        console.log(fileUploaded.name)
        let formData = new FormData();
        formData.append('file' , fileUploaded)
        try {
            const response = axios.post(`http://127.0.0.1:8000/accounts/upload_pic`,formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRFToken": Cookies.get('csrftoken')

                },
            },
            );
            response.then(r=>{console.log(r)})
        } catch (error) {
            console.error(error)
        }
    }
    const UpdateHandler = () => {
        setSaveBtn(true)
        setActive(true)
    }
    const SaveHandler = (e) => {
        setSaveBtn(false)
        setActive(false)
        e.preventDefault();
        if (pswdshow){
            if (newPassword !== confirmPassword) {
                setErrorMessage('New password and confirm password must match.');
                setPswdshow(false)
                return;
            }
            
            try {
                const response =  axios.post(`http://127.0.0.1:8000/accounts/change_password`,
                {password : newPassword,
                confirm_password : confirmPassword},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get('csrftoken')
    
                    },
                },
                );
                response.then((response) => {
                    
                    if (response.status != 200) {
                        throw new Error('Failed to change password.');
                      }
                      setErrorMessage('Password changed successfully.');
                      setNewPassword('');
                      setConfirmPassword('');
                      try {
                        const response =  axios.post(`http://127.0.0.1:8000/accounts/update_profile`,
                            {name : profile.name,
                            branch : profile.branch,
                            designation : profile.designation,
                            about : profile.about,
                            linkedin : profile.linkedin,
                            youtube : profile.youtube
                            },
                            {
                                headers: {
                                    "Content-Type": "application/json",
                                    "X-CSRFToken": Cookies.get('csrftoken')
                
                                },
                            },
                            );
                            response.then((response) => {
                            console.log(response)
                            })
                    } catch (error) {
                        console.log(error)
                    }
                        dispatch(logout())
                        try {
                          const resp = axios.post("http://127.0.0.1:8000/accounts/logout")
                          console.log(resp)
                        } catch (error) {
                          console.error(error)
                        }
                        navigate("/");
                        window.location.reload()
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                })
            } catch (error) {
                console.log(error);
            }

           
        }
        setPswdshow(false)
        setEmailshow(false)
        try {
            const response =  axios.post(`http://127.0.0.1:8000/accounts/update_profile`,
                {name : profile.name,
                branch : profile.branch,
                designation : profile.designation,
                about : profile.about,
                linkedin : profile.linkedin,
                youtube : profile.youtube
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get('csrftoken')
    
                    },
                },
                );
                response.then((response) => {
                console.log(response)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const AddProfile = (e) => {
        const { name, value } = e.target;
        setProfile((predata) => {
            return {
                ...predata,
                [name]: value
            }
        })
    }
    useEffect(() => {
        const GetProfile = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/accounts/get_profile`);
                const data = response.data
                console.log(data)
                setProfile({
                    name: data.name,
                    branch: (data.branch)?data.branch:"",
                    designation: data.designation,
                    about: data.about,
                    youtube: data.youtube,
                    linkedin: data.linkedin
                })
                setPP(data.profilePic)

            } catch (error) {
                console.error(error)
            }
        }
        GetProfile()
      }, []);
      
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
                        <img src={ProfilePic} alt="Profile" />
                        <div className="profile-buttons">
                            <button className="btn-upload" onClick={handleClick}>Upload New</button>
                            <input type="file" style={{display:'none'}} ref={hiddenFileInput} onChange={handleChange}/> 
                            {/* <button className="btn-remove">Remove Profile Picture</button> */}
                        </div>
                    </div>
                </div>
                <div className='grid-container'>
                    <div className="form-group name-group">
                        <label htmlFor="Name">Name</label>
                        <input type="text" id="Name" name = "name" disabled={!active} onChange={AddProfile} value={profile.name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Designation">Designation</label>
                        <select id="designation" disabled={!active}
                            name="designation" onChange={AddProfile} value={profile.designation}
                            >
                            <option value=""></option>
                            <option value="Head Of Department">Head Of Department</option>
                            <option value="Professor">Professor</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Assitant Professor">Assitant Professor</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                        <select id="branch" name ="branch" disabled={!active} onChange={AddProfile} value={profile.branch}>
                            <option value=""></option>
                            <option value="CS">Computer Science</option>
                            <option value="EE">Electrical & Electronics</option>
                            <option value="ET">Elecetronics & Telecommunications</option>
                            <option value="CE">Civil</option>
                            <option value="ME">Mechanical</option>
                        </select>
                    </div>
                    <div className="password-box">
                        <label>Password</label>
                        {
                            pswdshow ?
                                <div className='grid-container'>
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                        <input type="password" id="password" disabled={!active} onChange={(e) => setNewPassword(e.target.value)}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Confirm Password</label>
                                        <input type="password" id="confirm_password" disabled={!active} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                    </div>
                                    {errorMessage && <div>{errorMessage}</div>}
                                </div>
                                :
                                <div>
                                    <button className="btn-change-password" onClick={() => setPswdshow(true)}>Change Password</button>
                                    {errorMessage && <div>{errorMessage}</div>}
                                </div>

                        }

                    </div>
                    <div className="form-group about-box">
                        <label>About:</label>
                        <textarea
                             name="about" onChange={AddProfile}
                             disabled={!active} value={profile.about}/>
                    </div>
                    <div className='social-links'>
                        <h3>Social Links</h3>
                        <div className='grid-container'>
                        <div className="form-group">
                            <label htmlFor="Linkedin">Linkedin</label>
                            <input type="text" id="Linkedin" name="linkedin" disabled={!active} value={profile.linkedin} onChange={AddProfile} />
                        </div>
                        <div className="form-group">
                        <label htmlFor="Youtube">Youtube</label>
                            <input type="text" id="Youtube" name="youtube" disabled={!active} value={profile.youtube}  onChange={AddProfile}/>
                        </div>
                        </div>
                    </div>
                </div> 
            </form>
        </div>
    )
}



export default TSettings;