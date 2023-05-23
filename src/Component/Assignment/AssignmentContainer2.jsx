import React, { useState } from 'react'
import './Assignment.css'
import textFile from '../../Images/TextFile.png'
import { BsArrowDownSquareFill, BsThreeDotsVertical, BsFillArrowLeftSquareFill, BsCheckSquare } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { SiObservable } from "react-icons/si";
import SubmittedAssignmentContainer from './SubmittedAssignmentContainer';
import InstructionContainer from './InstructionContainer';
// import PDFpreviewer from '../PDF/PDFpreviewer';
const AssignmentContainer2 = () => {
    const [instructionshow, setInstructionShow] = useState(true)
    const [submissionshow, setSubmissionShow] = useState(false)
    const InstructionHandler = () => {
        setInstructionShow(true)
        setSubmissionShow(false)
    }
    const SubmissionHandler = () => {
        setInstructionShow(false)
        setSubmissionShow(true)
    }
    return (
        <div className='AssignmentContainer2'>
            <div>
                <div>
                    <h3>Unit 1 Assignment</h3>
                    <button>
                        <BsThreeDotsVertical />

                    </button>
                </div>
                <button>
                    <BsFillArrowLeftSquareFill />
                </button>
            </div>
            <div>
                <span>By Shanu k Rakesh</span>
                <span>Posted on: 26/4/23</span>
            </div>
            <div>
                <h3>Due on : 2/5/13</h3>
                <ul>
                    <li>
                        <button className={instructionshow && 'active'} onClick={InstructionHandler}>Instuction</button>
                    </li>
                    <li>
                        <button className={submissionshow && 'active'} onClick={SubmissionHandler}>Submission</button>
                    </li>
                </ul>
            </div>
            <hr />
            {
                instructionshow && <InstructionContainer/>
            }
            {
                submissionshow && 
            <div>
                <h3>All Students</h3>
                <div className='student-list'>
                    <SubmittedAssignmentContainer />
                    <SubmittedAssignmentContainer />
                    <SubmittedAssignmentContainer />
                    <SubmittedAssignmentContainer />
                </div>
            </div>
            }
            <hr />
            <div className='class-comment'>
                <h3>Class Comment</h3>
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
    )
}

export default AssignmentContainer2