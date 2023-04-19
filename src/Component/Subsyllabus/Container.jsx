import React from 'react'
import './Subsyllabus.css'
import youtube from '../../Images/YouTube.png'
import HOD from '../../Images/HOD.jpg'
const Container = () => {
  return (
    <>
        <div className='subsyllabus_con'>
            <h3 className='class_heading'>Teacher In Charge</h3>
            <div className='row'>
                <div className='imgBx'>
                    <img src={HOD} />
                </div>
                <div className='detail'>
                    <h3 className='teacherName'>Dr. Shanu K Rakesh Kuttan</h3>
                    <div className='other_detail'>
                        <span>HOD CSE</span>
                        <div><img src={youtube} width="24" height="24"/><span>Shanu Kuttan CSE</span></div>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio diam viverra lorem sed odio maecenas feugiat sollicitudin euismod. Massa elit fermentum in ac in ut ultrices pharetra. Eleifend suspendisse arcu quis aliquam lorem massa mauris congue. Augue est at in quis dignissim.</p>
                    <div className='teacher_sub'>
                        <span>Subject:&nbsp;</span>
                        <span>ML</span>
                        <span>,CN</span>
                        <span>,COA</span>
                        <span>,DBMS</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Container