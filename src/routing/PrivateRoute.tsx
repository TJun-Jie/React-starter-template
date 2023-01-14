import React from "react"
import {Route, Navigate} from "react-router-dom"
import {useAuth, useUserContext} from "../AuthProvider";
import {Box, CircularProgress} from "@mui/material";

const PrivateRoute = ({children}: any) => {
    let auth = useAuth();

    if(auth.loading){
        return (
            <Box sx={{ marginTop: "30px"}}>
               <CircularProgress />
            </Box>

            )
    }
    if(!auth.user) {
        return <Navigate to="/login" />
    }

    return children;
};

export default PrivateRoute;