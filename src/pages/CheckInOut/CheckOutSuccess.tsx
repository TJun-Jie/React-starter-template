import React from "react";
import {Alert, AlertTitle, Box, Container} from "@mui/material";

export const CheckOutSuccess = () => {
        return (
            <Container sx={{ width: "50%", marginLeft: "auto" , marginRight: "auto" , marginTop: 7}}>
                    <Alert severity="success" sx={{fontSize: "17px"}}>
                        You have successfully <strong>check out!</strong>
                    </Alert>
            </Container>
        )
}