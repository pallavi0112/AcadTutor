import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AuthenticatedRoute = (props) => {
  console.log(props);
  let { isAuthenticated, allowedRoles, userRole, children, Component }=props
  console.log(Component)
  // console.log(allowedRoles.includes(userRole))
  const navigate = useNavigate();
  useEffect(() => {
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    // console.log(isAuthenticated);
    if (isAuthenticated === 'false') {
  console.log("AMAN")

      return navigate("/")
    } 
    // else if (!(allowedRoles.includes(userRole))) {
    //   return navigate('/unauthorized')
    // } 
    else {
  console.log("AMAN1")

      return children
    }
  })



  // useEffect(() => {
  //   let login = localStorage.getItem('login');
  //   if (!login) {
  //     navigate('/login');
  //   }
  // })



}

export default AuthenticatedRoute;

