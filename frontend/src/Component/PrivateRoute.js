import React from 'react';
import { Link ,Navigate} from 'react-router-dom';


export default function PrivateRoute({ children }) {
    const type = localStorage.getItem('type')
    const isTeacher = (type==='teacher')?true:false;
    console.log(type,isTeacher)
    if (isTeacher) {
        return (children)
    } else {
        return <Navigate to="/" />

    }

}