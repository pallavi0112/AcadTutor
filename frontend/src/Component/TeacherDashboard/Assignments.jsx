import React, { useEffect , useState } from 'react'
import Announcement from '../Assignment/Announcement'
import AssignmentForm from '../Assignment/AssignmentForm'
import { useSelector } from 'react-redux'
import AssignmentContainer from '../Assignment/AssignmentContainer'
import AssignmentContainer2 from '../Assignment/AssignmentContainer2'
const Assignments = () => {
  const { assignmentForm } = useSelector((state) => state.showLoginSlice)
  const  {assignmentContainer2Show}  = useSelector((state) => state.showLoginSlice)
  const [show , setShow] = useState()
  useEffect(()=>{
    console.log(assignmentContainer2Show)
    setShow(assignmentContainer2Show )
  },[assignmentContainer2Show])
  return (
    <>

      <section id='assignment-announcement-section' style={{ width: "95%", marginInline: "auto" }}>
         {
            assignmentForm?<AssignmentForm/> : null
         }
         {show ? <AssignmentContainer2 /> :
        <>
        <Announcement />
        <AssignmentContainer />
         </>
        }
      </section>
    </>
  )
}

export default Assignments