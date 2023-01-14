import React from "react";
import {Box, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as Yup from 'yup';
import {useFormik} from "formik";
import { useAuth } from "../AuthProvider";
import {useNavigate} from "react-router-dom";

    const validationSchema =  Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required("Password is required").min(6 ,"Password must be at least 6 Character long"),
    repeatPassword: Yup.string().when('password', {
        is: (val: string) => val && val.length > 0,
        then: Yup.string()
            .oneOf([Yup.ref('password')], 'Both passwords need to be the same')
            .required('Required'),
    }),
})
export const SignUpPage = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await signUp(values.email, values.password);
                navigate('/home')
                console.log("success");
            } catch(error) {
               console.log(error)
            }
        }
    });
    const navigate = useNavigate();

    const { signUp } = useAuth();


    return (
        <Box
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
        >
            <Typography variant="h5"  sx={{ paddingTop: "20px"}}>
                Sign Up
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
                <div>
                    <TextField
                        fullWidth
                        id="repeatPassword"
                        name="repeatPassword"
                        label="Repeat Password"
                        type="password"
                        value={formik.values.repeatPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.repeatPassword && Boolean(formik.errors.repeatPassword)}
                        helperText={formik.touched.repeatPassword && formik.errors.repeatPassword}
                    />
                </div>
                <Button color="primary" variant="contained" type="submit">Submit</Button>
            </form>
        </Box>
    )
}
