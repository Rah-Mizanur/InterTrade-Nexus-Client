import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router'
import { AuthContext } from '../Provider/AuthProvider'

const PrivateRoute = ({children}) => {
    const {user} = use(AuthContext)
    const location = useLocation()
    // console.log(location)

    // if(loading){
    //    return <p> Loading ....</p>
    // }

    if(user && user?.email){
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
}

export default PrivateRoute
