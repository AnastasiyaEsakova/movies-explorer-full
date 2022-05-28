import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    <>
    <Route>
      {
        () => props.loggedIn ?  <Component {...props} /> : <Redirect to={localStorage.getItem('token') ? props.location : '/'}/>
      }
    </Route>
    {props.children}
    </>
)}

export default ProtectedRoute;
