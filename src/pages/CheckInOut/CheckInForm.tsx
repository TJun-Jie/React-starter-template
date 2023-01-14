import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export const CheckInForm = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            numberOfPax: '1',
            timeOccupiedTill: '00:00',
        },
        onSubmit: (values) =>{
            console.log(values);

            // Handle check in logic here

            navigate('/checkinsuccess')
        }
    });
    
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
                inputProps={{min:1, max:4}}
                value = {formik.values.numberOfPax}
                onChange={formik.handleChange}
                error = {formik.touched.numberOfPax && Boolean(formik.errors.numberOfPax)}
                helperText={formik.touched.numberOfPax && formik.errors.numberOfPax}
            />
        </div>
        <div>
            <TextField
                label="Occupied Till"
                id="timeOccupiedTill"
                name="timeOccupiedTill"
                type="time"
                value={formik.values.timeOccupiedTill}
                onChange={formik.handleChange}
                error={formik.touched.timeOccupiedTill && Boolean(formik.errors.timeOccupiedTill)}
                helperText={formik.touched.timeOccupiedTill && formik.errors.timeOccupiedTill}
            />
        </div>
        <Button color="primary" variant="contained" type="submit">Check In</Button>
    </form>
    </Box>)
}