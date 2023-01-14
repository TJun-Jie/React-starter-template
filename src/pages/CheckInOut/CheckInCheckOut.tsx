import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from "react";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../../AuthProvider";

export const CheckInCheckOut = () => {
    let auth = useAuth();
    const navigate = useNavigate();

    const currTable = {
        tableNumber: 1,
        isInUse: false,
        numberOfSeats: 4,
        timeOccupiedTill: "12:00"
    }

    const onCheckIn = () => {
        console.log("check in")

        if (auth.user && !currTable.isInUse) {
            navigate("/checkinform/" + currTable.tableNumber)
        }
    }

    const onCheckOut = () => {
        console.log("check out")

        if (auth.user && currTable.isInUse) {
            navigate("/checkoutsuccess")

            // Do checkout database logic here
            // currTable.isInUse = false;
        }

    }

    return (<Box
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          Table number : {currTable.tableNumber}
        </Typography>
        <Typography variant="h4" component="div">
          Status : {currTable.isInUse ? "Avaliable" : "Not available"}
        </Typography>
        {currTable.isInUse && <div>
            <Typography variant="h6" component="div">
                Number of Seats : {currTable.numberOfSeats}
            </Typography>
            
            <Typography variant="h6" component="div">
                Occupied Till : {currTable.timeOccupiedTill}
            </Typography>
            </div>
        }

      </CardContent>
    </Card>
      
        <div>
            <Button color="primary" variant="contained" size="large" onClick={onCheckIn} disabled={currTable.isInUse}>Check In</Button>
        </div>
        <div>
            <Button color="primary" variant="contained" size="large" onClick={onCheckOut} disabled={!currTable.isInUse}>
                Check Out
            </Button>
        </div>
      </Box>)
}