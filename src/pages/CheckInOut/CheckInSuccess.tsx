import React from "react";
import {Alert, AlertTitle, Container} from "@mui/material";

export const CheckInSuccess = () => {
    return (
        <Container sx={{ width: "50%", marginLeft: "auto" , marginRight: "auto" , marginTop: 7}}>
            <Alert severity="success" sx={{fontSize: "17px"}}>
                You have successfully <strong>checked in!</strong>
            </Alert>
        </Container>
        )
}