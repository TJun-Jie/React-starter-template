import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, setDoc, doc, updateDoc, getDoc,Timestamp } from "firebase/firestore";
import { db } from "../../config/.firebaseSetup";

export const CheckInForm = () => {
    const {tableId} = useParams();
    const [currTable, setCurrTable] = useState({
        available: true,
        leavingTime: "",
        plugs: 0,
        seats: 0,
        pax: 0,
        tableNumber: "0",
        reports: [],
    });

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            numberOfPax: '',
            leavingTime: '',
        },
        onSubmit: (values) =>{
            if (values.leavingTime == '' || values.numberOfPax == '') {
                console.log("empty")
                return
            }
            const updatedTable = {
                available: false,
                leavingTime: values.leavingTime,
                plugs: currTable.plugs,
                pax: values.numberOfPax,
                seats: currTable.seats,
                tableNumber: currTable.tableNumber,
                reports: currTable.reports,
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
                
                navigate('/checkinsuccess')
            }
        },
    });

    useEffect(() => {
        if (tableId != undefined) {
            getDoc(doc(db, "tables", tableId))
            .then((querySnapshot) => {
                const newData = querySnapshot.data();
                console.log(newData)
                if (newData != undefined) {
                    setCurrTable({
                        available: newData.available,
                        leavingTime: newData.leavingTime,
                        plugs: newData.plugs,
                        pax: newData.pax,
                        seats: newData.seats,
                        tableNumber: newData.tableNumber,
                        reports: newData.reports,
                    })
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            })
        }

    }, []);
    
    return (
        <Box
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <Typography variant="h5"  sx={{ paddingTop: "20px"}}>
               Check In
            </Typography>
    <form onSubmit={formik.handleSubmit}>
        <div>
            <TextField
                label="Number of Pax"
                id = "numberOfPax"
                name = "numberOfPax"
                type="number"
                inputProps={{min:1, max:currTable.seats}}
                value = {formik.values.numberOfPax}
                onChange={formik.handleChange}
                error = {formik.touched.numberOfPax && Boolean(formik.errors.numberOfPax)}
                helperText={formik.touched.numberOfPax && formik.errors.numberOfPax}
            />
        </div>
        <div>
            <TextField
                label="Leaving Time"
                id="leavingTime"
                name="leavingTime"
                type="time"
                value={formik.values.leavingTime}
                onChange={formik.handleChange}
                error={formik.touched.leavingTime && Boolean(formik.errors.leavingTime)}
                helperText={formik.touched.leavingTime && formik.errors.leavingTime}
            />
        </div>
        <Button color="primary" variant="contained" type="submit">Check In</Button>
    </form>
    </Box>)
}