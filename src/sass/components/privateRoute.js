import React from 'react'
import {Route, Navigate, Outlet} from "react-router-dom"
import {useAuth} from "../contexts/AuthContext"


function PrivateRoute ({component: Component, ...rest}) {
    const {currentUser} = useAuth()
  return (
    // <Route
    // {...rest}
    // render={props => {
    //     return currentUser ? <Outlet /> : <Navigate to="login" />
    // }}>
        
    // </Route>
    currentUser ? <Outlet /> : <Navigate to="/login" />
  )
}
export default PrivateRoute