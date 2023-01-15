import React, {useState, useEffect} from "react";
import {Box, Typography, TextField, Button} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { updateDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/.firebaseSetup";
import { tableState } from "../Map";

export const CheckOutForm = () => {
    const {tableId} = useParams();
    const [currTable, setCurrTable] = useState<tableState>({} as tableState);

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            description: '',
        },
        onSubmit: (values) =>{
            const updatedReports = values.description ? [
                {
                    description: values.description,  
                    timestamp: Timestamp.now(),
                },
                ...currTable.reports
            ] : currTable.reports
            const updatedTable = {
                available: true,
                leavingTime: "",
                plugs: currTable.plugs,
                pax: 0,
                seats: currTable.seats,
                tableNumber: currTable.tableNumber,
                reports: updatedReports,
            }
            console.log(updatedTable)
            // Handle check in logic here

            if (tableId != undefined) {
                updateDoc(doc(db, "tables", tableId), updatedTable)
                .then(docRef => {
                    console.log("success")
                }).catch(err => {
                    console.log(err)
                })
                
                navigate('/checkoutsuccess', {state: {noiseComplaint: currTable.noiseComplaint}})
            }
        },
    });

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

        return (
        <Box
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <Typography variant="h5"  sx={{ paddingTop: "20px"}}>
               Check Out
            </Typography>
    <form onSubmit={formik.handleSubmit}>
        <div>
            <TextField
                label="Anything to report?"
                id = "description"
                name = "description"
                type="text"
                value = {formik.values.description}
                onChange={formik.handleChange}
                error = {formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
            />
        </div>
        <Button color="primary" variant="contained" type="submit">Check Out</Button>
    </form>
    </Box>
        )
}