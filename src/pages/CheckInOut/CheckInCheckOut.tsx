import { Box, Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { collection, addDoc, getDocs } from "firebase/firestore";
import {useAuth} from "../../AuthProvider";
import { db } from "../../config/.firebaseSetup"

export const CheckInCheckOut = () => {
    const {tableId} = useParams();
    const [currTable, setCurrTable] = useState({
        available: false,
        leavingTime: "",
        plugs: 0,
        seats: 0,
        tableNumber: "0",
    });

    let auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getDocs(collection(db, "seats"))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data()}));
                // @ts-ignore
                console.log(newData)
                newData.map((table) => {
                    if (table.tableNumber === tableId) {
                        setCurrTable({
                            available: table.available,
                            leavingTime: table.leavingTime,
                            plugs: table.plugs,
                            seats: table.seats,
                            tableNumber: table.tableNumber,
                        })
                    }
                })
            })
    }, []);

    const onCheckIn = () => {
        console.log("check in")

        if (auth.user && !currTable.available) {
            navigate("/checkinform/" + currTable.tableNumber)
        }
    }

    const onCheckOut = () => {
        console.log("check out")

        if (auth.user && currTable.available) {
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
          Table number : {tableId}
        </Typography>
        <Typography variant="h4" component="div">
          Status : {currTable.available ? "Avaliable" : "Not available"}
        </Typography>
        {currTable.available && <div>
            <Typography variant="h6" component="div">
                Number of Seats : {currTable.seats}
            </Typography>
            
            <Typography variant="h6" component="div">
                Number of Plugs : {currTable.plugs}
            </Typography>
            <Typography variant="h6" component="div">
                Occupied Till : {currTable.leavingTime}
            </Typography>
            </div>
        }

      </CardContent>
    </Card>
      
        <div>
            <Button color="primary" variant="contained" size="large" onClick={onCheckIn} disabled={currTable.available}>Check In</Button>
        </div>
        <div>
            <Button color="primary" variant="contained" size="large" onClick={onCheckOut} disabled={!currTable.available}>
                Check Out
            </Button>
        </div>
      </Box>)
}