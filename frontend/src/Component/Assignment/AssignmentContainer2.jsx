import React from 'react'
import './Assignment.css'
import textFile from '../../Images/TextFile.png'
import { BsArrowDownSquareFill, BsThreeDotsVertical, BsFillArrowLeftSquareFill, BsCheckSquare } from "react-icons/bs";
import { ImCheckboxUnchecked } from "react-icons/im";
import { SiObservable } from "react-icons/si";
// import PDFpreviewer from '../PDF/PDFpreviewer';
const AssignmentContainer2 = () => {
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
                        <button className='active'>Instuction</button>
                    </li>
                    <li>
                        <button>Submission</button>
                    </li>
                </ul>
            </div>
            <hr />
            <div className='instruct-container'>
                <h3>20 Points</h3>
                <div>
                    Two arrays are said to be compatible if they are of the same size and if the ith element in the first array is greater than or equal to the ith element in the second array for all i elements.

                    Write a Java program to find whether 2 arrays are compatible or not. If the arrays are compatible display the message as "Arrays are Compatible" if not then display the message as "Arrays are Not Compatible".
                </div>
                <h3>Attach File</h3>
                <img />
            </div>
            <div>
                <h3>All Students</h3>
                <div className='student-list'>
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
                                    {/* <h4 className='title points'>18/20</h4> */}
                                    <SiObservable className='observable' />

                                </div>
                                <div className='imgBx'>
                                    <button>
                                        <BsArrowDownSquareFill />
                                    </button>
                                </div>
                            </div>
                        </div>
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
                    </div>
                    <div className='assignment'>
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
                                {/* <h4 className='title points'>18/20</h4> */}
                                <ImCheckboxUnchecked className='uncheck' />

                            </div>
                            <div className='imgBx'>
                                <button>
                                    <BsArrowDownSquareFill />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='assignment'>
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
                                {/* <h4 className='title points'>18/20</h4> */}
                                <BsCheckSquare />
                            </div>
                            <div className='imgBx'>
                                <button>
                                    <BsArrowDownSquareFill />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='assignment'>
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
                                {/* <h4 className='title points'>18/20</h4> */}
                                {/* <BsCheckSquare /> */}
                            </div>
                            <div className='imgBx'>
                                <button>
                                    <BsArrowDownSquareFill />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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