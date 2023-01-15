import React from "react";
import {Box, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as Yup from 'yup';
import {useFormik} from "formik";
import { useAuth } from "../AuthProvider";
import {useNavigate, useLocation} from "react-router-dom";

const validationSchema =  Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required("Password is required").min(6 ,"Password must be at least 6 Character long"),
})
export const LoginPage = () => {
    const navigate = useNavigate();
    const { signIn } = useAuth();
    const { state } = useLocation();
    const prev = state?.prevPath || "/home";

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await signIn(values.email, values.password)
                console.log("success");
                navigate(prev)
            } catch(error) {
                console.log(error)
            }
        }
    });


    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
        >
            <Typography variant="h5"  sx={{ paddingTop: "20px"}}>
               Login
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        label="Email"
                        id = "email"
                        name = "email"
                        value = {formik.values.email}
                        onChange={formik.handleChange}
                        error = {formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </div>
                <Button color="primary" variant="contained" type="submit">Login</Button>
            </form>
        </Box>
    )
}
