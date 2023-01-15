import React from "react";
import {Alert, AlertTitle, Box, Container} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Error } from "@mui/icons-material";

export const CheckOutSuccess = () => {
     const location = useLocation();
        return (

            <Container sx={{ width: "50%", marginLeft: "auto" , marginRight: "auto" , marginTop: 7}}>
                    <Alert severity="success" sx={{fontSize: "17px"}}>
                        You have successfully <strong>checked out!</strong>
                    </Alert>
                    {location.state.noiseComplaint > 0 ? <Alert severity="warning" sx={{mt:5}}>You have {location.state.noiseComplaint} noise complaint{location.state.noiseComplaint > 1 ? "s" : ""}, please be <strong>quieter</strong> next time. </Alert> : <div></div>}
            </Container>
        )
}