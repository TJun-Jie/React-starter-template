import React from "react"
import {Route, Navigate} from "react-router-dom"
import {useAuth} from "../AuthProvider";

const PrivateRoute = ({children}: any) => {
    let auth = useAuth();

    if(!auth.user) {
        return <Navigate to="/login" />
    }

    return children;
};

export default PrivateRoute;