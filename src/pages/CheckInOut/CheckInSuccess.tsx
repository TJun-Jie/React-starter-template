import React from "react";
import {Alert, AlertTitle, Container, useTheme, useMediaQuery, Box} from "@mui/material";

export const CheckInSuccess = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container sx={{ width: isMobile ? "70%": "50%", marginLeft: "auto" , marginRight: "auto" , marginTop: 7}}>
            <Alert severity="success" sx={{fontSize: "17px", alignItems:"center"}}>
                <Box>
                You have successfully <strong>checked in!</strong>
                </Box>
            </Alert>
        </Container>
        )
}