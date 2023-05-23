import React ,{useState} from 'react'
import textFile from '../../Images/TextFile.png'
import { BsArrowDownSquareFill, BsThreeDotsVertical, BsFillArrowLeftSquareFill, BsCheckSquare } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { SiObservable } from "react-icons/si";
const SubmittedAssignmentContainer = () => {
    const [bottomshow , setBottomShow] = useState(false)
    const [mark , setMark] = useState(1)
    return (
        <div className='assignment-submit-container'>
            <div className='top-container assignment'>
                <div className='left-side'>
                    <div className='imgBx'>
                        <img src={textFile} />
                    </div>
                    <div>
                        <h4 className='title '>Student-1</h4>
                        <span className='date submit-date'>Submitted on: 26/4/23</span>
                    </div>
                </div>
                <div className='right-side'>
                    <div>
                       {
                         mark ? <BsCheckSquare/> : <ImCheckboxUnchecked className='uncheck' />
                       }
                        {/* <SiObservable className='observable' /> */}
                        
                        
                    </div>
                    <div className='imgBx'>
                        <button>
                            <BsArrowDownSquareFill onClick={()=>setBottomShow(!bottomshow)}/>
                        </button>
                    </div>
                </div>
            </div>
            {
                bottomshow 
                &&
            <div className='bottom-container'>
                <div>
                    <div>
                       <span>Submission</span>
                    </div>
                    <div>
                        <form>
                            <div>
                                <input type='text' disabled={false} />
                            </div>
                            <button className='Formbutton'>
                                Return
                            </button>
                        </form>
                    </div>
                </div>
                <div>
                    <div className='class-comment student-comment'>
                        <div>
                            <img />
                            <div>
                                <span>Student 1</span>
                                <p>Lorem ipsum dolor sit amet consectetur. Nam facilisis arcu tempus auctor consequat. Id </p>
                            </div>
                        </div>
                    </div>
                    <div className='class-comment teacher-comment'>
                        <div>
                            <img />
                            <div>
                                <form>

                                    <input
                                        type='text'
                                    />
                                    <button className='Formbutton'>
                                        POST
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

               
            }
        </div>
    )
}

export default SubmittedAssignmentContainer