import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AuthenticatedRoute = ({ isAuthenticated, allowedRoles, userRole, children, Component }) => {
  console.log(Component)
  console.log(allowedRoles.includes(userRole))
  const navigate = useNavigate();
  useEffect(() => {
     const isAuth = JSON.parse(localStorage.getItem('isAuthenticated'))
     console.log(isAuth)
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    // console.log(isAuthenticated);
    if (!isAuth) {
      return navigate("/")
    } 
    else if (!(allowedRoles.includes(userRole))) {
      return navigate('/unauthorized')
    } 
    else {
      return Component
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

