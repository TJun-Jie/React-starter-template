import React from "react"
import {Route, Navigate, useLocation} from "react-router-dom"
import {useAuth, useUserContext} from "../AuthProvider";
import {Box, CircularProgress} from "@mui/material";

const PrivateRoute = ({children}: any) => {
    let auth = useAuth();
    let location = useLocation();

    if(auth.loading){
        return (
            <Box sx={{ marginTop: "30px"}}>
               <CircularProgress />
            </Box>

            )
    }
    if(!auth.user) {
        console.log(location)
        const prevPath = location.pathname
        return <Navigate to="/login" state={{ prevPath }}/>
    }

    return children;
};

export default PrivateRoute;