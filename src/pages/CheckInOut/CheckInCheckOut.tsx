import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "../../AuthProvider";
import { db } from "../../config/.firebaseSetup";

export const CheckInCheckOut = () => {
  const { tableId } = useParams();
  const [currTable, setCurrTable] = useState({
    available: true,
    leavingTime: "",
    plugs: 0,
    seats: 0,
    pax: 0,
    tableNumber: "0",
  });

  let auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (tableId != undefined) {
      getDoc(doc(db, "tables", tableId))
        .then((querySnapshot) => {
          const newData = querySnapshot.data();
          console.log(newData);
          if (newData != undefined) {
            setCurrTable({
              available: newData.available,
              leavingTime: newData.leavingTime,
              plugs: newData.plugs,
              pax: newData.pax,
              seats: newData.seats,
              tableNumber: newData.tableNumber,
            });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, []);

  const onCheckIn = () => {
    console.log("check in");

    if (auth.user && currTable.available) {
      navigate("/checkinform/" + tableId);
    }
  };

  const onCheckOut = () => {
    console.log("check out");

    if (auth.user && !currTable.available) {
      const updatedTable = {
        available: true,
        leavingTime: "",
        plugs: currTable.plugs,
        pax: 0,
        seats: currTable.seats,
        tableNumber: currTable.tableNumber,
      };
      console.log(updatedTable);
      // Handle check in logic here

      if (tableId != undefined) {
        updateDoc(doc(db, "tables", tableId), updatedTable)
          .then((docRef) => {
            console.log("success");
          })
          .catch((err) => {
            console.log(err);
          });

        navigate("/checkoutsuccess");
      }
    }
  };

  return (
    <Box
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" component="div">
            Status : {currTable.available ? "Avaliable" : "In use"}
          </Typography>
          <Typography variant="h6" component="div">
            Table number : {currTable.tableNumber}
          </Typography>
          <Typography variant="h6" component="div">
            Number of Seats : {currTable.seats}
          </Typography>

          <Typography variant="h6" component="div">
            Number of Plugs : {currTable.plugs}
          </Typography>

          {!currTable.available && (
            <div>
              <Typography variant="h6" component="div">
                Number of Pax : {currTable.pax}
              </Typography>

              <Typography variant="h6" component="div">
                Occupied Till : {currTable.leavingTime}
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <Box display="flex" flexDirection="row"  justifyContent="center">

          <Box sx={{ paddingTop: "20px", paddingRight: 5 }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={onCheckIn}
              disabled={!currTable.available}
            >
              Check In
            </Button>
          </Box>

          <Box sx={{ paddingTop: "20px" }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={onCheckOut}
              disabled={currTable.available}
            >
              Check Out
            </Button>
          </Box>
        </Box>
      </div>
    </Box>
  );
};
