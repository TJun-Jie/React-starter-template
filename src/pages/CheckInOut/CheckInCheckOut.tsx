import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {CircularProgress} from "@mui/material";
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
import { tableState } from "../Map";

export const CheckInCheckOut = () => {
  const { tableId } = useParams();
  const [currTable, setCurrTable] = useState<tableState>({} as tableState);

  let auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (tableId != undefined) {
      getDoc(doc(db, "tables", tableId))
        .then((querySnapshot) => {
          const newData = querySnapshot.data();
          console.log(newData);
          if (newData != undefined) {
            setCurrTable(newData as tableState);
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
    const noise = currTable.noiseComplaint
    if (auth.user && !currTable.available) {

      navigate("/checkoutform/" + tableId);
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

          <Typography variant="h6" component="div">
            Noise Complaint : {currTable.noiseComplaint}
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

<Typography variant="h6" component="div">
                Reports : 
              </Typography>

            {currTable.reports == undefined ?
            <Box sx={{ marginTop: "30px"}}>
               <CircularProgress />
            </Box> 
            : currTable.reports.length >= 1
            ? 
            currTable.reports.map((report) => {
              return (
                <Box display="flex" flexDirection="column" justifyContent="center">
                  <Box display="flex" flexDirection="row" justifyContent="space-around">
                  <Typography variant="h6" component="div">
                    {report.description}
                  </Typography>

                  
                  <Typography variant="h6" component="div">
                    {report.timestamp.toDate().getDate()}/{report.timestamp.toDate().getMonth() + 1}/{report.timestamp.toDate().getFullYear()}
                  </Typography>
                  </Box>
                </Box>
              );
            })
            : <Typography variant="h6" component="div">
                No reports
                </Typography>}

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
