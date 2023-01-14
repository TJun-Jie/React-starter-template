import Grid from "@mui/material/Grid";
import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { HomePage } from "../pages/Home";
import {SmallNavBar } from "./SmallNavBar";
import {SignUpPage} from "../pages/SignUp";
import {LoginPage} from "../pages/SignIn";
import {CheckInSuccess} from "../pages/CheckInOut/CheckInSuccess";
import {CheckOutSuccess} from "../pages/CheckInOut/CheckOutSuccess";
import { CheckInCheckOut } from "../pages/CheckInOut/CheckInCheckOut";
import { CheckInForm } from "../pages/CheckInOut/CheckInForm";
import PrivateRoute from "./PrivateRoute";
import { MapPage } from "../pages/Map";

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
                    <Route path="/checkinsuccess" element={<CheckInSuccess />}/>
                    <Route path="/checkoutsuccess" element={<CheckOutSuccess />}/>
                    <Route path="/checkincheckout/:tableId" element={<CheckInCheckOut />}/>
                    <Route path="/checkinform/:tableId" element={<CheckInForm />}/>
                    <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/map" element={<PrivateRoute><MapPage/></PrivateRoute>}/>
                </Routes>
            </Grid>
    )
}


export default ApplicationRouter;