import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import {Box, Menu, MenuItem, useMediaQuery, useTheme} from "@mui/material";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

export const SmallNavBar = () => {
    let auth = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigateToMap = () => {
        handleClose();
        navigate("/map");
    }
    console.log(isMobile)


    return (
       <AppBar position="sticky" enableColorOnDark  sx={{ color: "white", fontWeight: "bold", background: "#495C83",
           ...(isMobile && {
               width: "600px"
           }),
       }}
        >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={handleClick}
                >
                    <MenuIcon/>
                </IconButton>
                {!isMobile ? <Button color="primary" >Logout</Button> : ""}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={navigateToMap}>Maps</MenuItem>
                </Menu>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    StudySpots
                </Typography>
                {auth.user ? (
                        <div>
                            {!isMobile ?  <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton> : ""}

                            <Button color="inherit" onClick={auth.logout}>Logout</Button>
                        </div>
                    ) :
                    <Box>
                        <Button color="inherit" onClick={ () => navigate("/login")} >Login</Button>
                        <Button color="inherit" onClick={ () => navigate("/signup")} >Sign Up</Button>
                    </Box>
                }

            </Toolbar>
        </AppBar>
    )
}