import React from "react";
import {Alert, AlertTitle, Box, Container,  useTheme, useMediaQuery} from "@mui/material";
import { useLocation } from "react-router-dom";
import { Error } from "@mui/icons-material";

export const CheckOutSuccess = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
     const location = useLocation();
        return (

            <Container sx={{ width: isMobile ? "70%": "50%", marginLeft: "auto" , marginRight: "auto" , marginTop: 7}}>
                    <Alert severity="success" sx={{fontSize: "17px",  alignItems:"center"}}>
                        <Box>
                        You have successfully <strong>checked out!</strong>
                        </Box>
                    </Alert>
                    {location.state.noiseComplaint > 0 ? 
                    <Alert severity="warning" sx={{mt:5, alignItems:"center"}}>
                        <Box>
                        You have {location.state.noiseComplaint} noise complaint{location.state.noiseComplaint > 1 ? "s" : ""}, please be <strong>quieter</strong> next time. 
                        </Box>
                        </Alert> : <div></div>}
            </Container>
        )
}