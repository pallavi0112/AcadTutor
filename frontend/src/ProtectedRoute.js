// AuthenticatedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({isAuthenticated , allowedRoles , userRole , children}) => {
     
     if(!isAuthenticated){
      return <Navigate to="/"/>
     } else if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized"/>;
    } else{
        return children
    }

  return (
    <>

    </>
  );
};

export default AuthenticatedRoute;
