
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({isAuthenticated , allowedRoles , userRole , children}) => {
    
        if(isAuthenticated === 'false'){
         return Navigate("/")
        } else if (!allowedRoles.includes(userRole)) {
         return <Navigate to="/unauthorized"/>;
       } else{
           return children
       }   
}

export default AuthenticatedRoute;
