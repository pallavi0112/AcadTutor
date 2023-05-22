import React from 'react'
import { AssignmentFormShow } from "../../features/Reducer";
import { useDispatch } from 'react-redux';
import AssignmentList from './AssignmentList';
import './Assignment.css'
const AssignmentContainer = () => {
  const dispatch = useDispatch();
  return (
    <>
    <div className='assignment-container'>
      <div>
        <button type="button"
          className="Formbutton"
          onClick={() => dispatch(AssignmentFormShow(true))}
        >
        Create New Assignment
        </button>
      </div>
      <div>
        <h3>Assigned</h3>
        <ul>
          <li>
            <button className='active'>All</button>
          </li>
          <li>
            <button>Unchecked</button>
          </li>
          <li>
            <button>Checked</button>
          </li>
        </ul>
      </div>
      <AssignmentList/>

    </div>

    </>
  )
}

export default AssignmentContainer