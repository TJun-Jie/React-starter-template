import Grid from "@mui/material/Grid";
import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { HomePage } from "../pages/Home";
import {SmallNavBar } from "./SmallNavBar";
import {SignUpPage} from "../pages/SignUp";
import {LoginPage} from "../pages/SignIn";
import PrivateRoute from "./PrivateRoute";

function ApplicationRouter() {
    return (
            <Grid item xs={12}
                  md={10}
                  lg={9}
                  xl={8}
                  style={{margin: "auto"}}>

                <SmallNavBar></SmallNavBar>
                <Routes>
                    <Route path="/signup" element={<SignUpPage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                </Routes>
            </Grid>
    )
}


export default ApplicationRouter;