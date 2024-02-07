import { Button, FormControl, FormHelperText, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import $axios from '../../lib/axios.instance';
import { openErrorSnackbar, openSuccessSnackbar } from '../store/slices/snackbar.slices';

const Register = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const {isError,isLoading,data,mutate:registerUser}=useMutation({
        mutationKey:["register-user"],
        mutationFn:async(values)=>{
            return await $axios.post("/user/register",values)
        },
        onSuccess:()=>{
            dispatch(openSuccessSnackbar("User has been registered successfully"))
            navigate("/login");
        },

        onError:(error)=>{
            dispatch(openErrorSnackbar(error.response.data.message));
        }
    })
  return (
    <>
    {isLoading && <LinearProgress color="secondary" />}
    <Formik
    initialValues={
        {
            "firstName":"",
            "lastName":"",
            "email":"",
            "password":"",
           // "gender":"",
           // "dob":"",
            "role":""
        }
    }
    validationSchema={Yup.object({
        firstName:Yup.string().min(2,"First name must be atleast two character..")
        .max(55,"First name must not exceed 55 character").trim()
        .required("First name is required"),
    
        lastName:Yup.string().min(3,"Last name must be atleast three character..")
        .max(55,"Last name must not exceed 55 character").trim()
        .required("Last name is required"),
    
        email:Yup.string().email("Must be valid email").max(55,"First name must not exceed 55 character")
        .lowercase().trim().required("Email is required"),
        
        password:Yup.string().trim().required("Password is required"),
    
        // gender:Yup.string().oneOf(["male","female","others"]).default(null),
    
        // dob:Yup.date().required().default(null),
    
        role:Yup.string().oneOf(["buyer","seller"]).required("Role is requiured")  
    })}
    onSubmit={(values)=>{
        //console.log(values);
        registerUser(values);
    }}
    >
        {
            ({handleSubmit,getFieldProps,touched,setFieldValue,errors})=>(
                <form onSubmit={handleSubmit}
                style={{
                    display:"flex",
                    flexDirection:"column",
                    padding:"2rem",
                    gap:"2rem",
                    minWidth:"400px",
                    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"

                }}
                >
                    <Typography variant='h4'>Sign up</Typography>
                    <FormControl>
                    <TextField 
                    color='success'
                    label="First Name" variant="outlined"
                    {...getFieldProps("firstName")}
                    />
                    {touched.firstName && errors.firstName ? 
                    (<FormHelperText error>{errors.firstName}</FormHelperText>) : null}
                    </FormControl>

                    <FormControl>
                    <TextField
                    color='success'
                    label="Last Name" variant="outlined" 
                    {...getFieldProps("lastName")}
                    />
                     {touched.lastName && errors.lastName ? 
                    (<FormHelperText error>{errors.lastName}</FormHelperText>) : null}
                    </FormControl>

                    <FormControl>
                    <TextField 
                    color='success'
                    label="Email" variant="outlined" 
                    {...getFieldProps("email")}
                    />
                     {touched.email && errors.email ? 
                    (<FormHelperText error>{errors.email}</FormHelperText>) : null}
                    </FormControl>

                    <FormControl>
                    <TextField 
                    color='success'
                    label="Password" variant="outlined" 
                    {...getFieldProps("password")}
                    />
                     {touched.password && errors.password ? 
                    (<FormHelperText error>{errors.password}</FormHelperText>) : null}
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel color='success'>Role</InputLabel>
                        <Select
                        color='success'
                        {...getFieldProps("role")}
                        label="Role"
                        onChange={(event)=>{setFieldValue("role",event.target.value)}}
                        >
                            <MenuItem value="buyer">Buyer</MenuItem>
                            <MenuItem value="seller">Seller</MenuItem>
                        </Select>
                            {touched.role && errors.role ? 
                            (<FormHelperText error>{errors.role}</FormHelperText>) : null}
                    </FormControl>
                    <Stack spacing={1}>
                        <Button variant="contained" type="submit" color="success">Register</Button>

                        <Link to="/login">
                            <Typography variant='subtitle2'>Already registered?Log in</Typography>
                        </Link> 
                    </Stack>
                   
                </form>
            )
        }

    </Formik>
    </>
  )
}

export default Register