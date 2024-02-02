import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'

const Register = () => {
  
  return (
    <Formik
    initialValues={
        {
            "firstName":"",
            "lastName":"",
            "email":"",
            "password":"",
            "gender":"",
            "dob":"",
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
    
        gender:Yup.string().oneOf(["male","female","others"]).default(null),
    
        dob:Yup.date().required().default(null),
    
        role:Yup.string().oneOf(["buyer","seller"]).required("Role is requiured")  
    })}
    onSubmit={(values)=>{
        console.log(values);
    }}
    >
        {
            ({handleSubmit,getFieldProps,touched,setFieldValue,errors})=>(
                <form onSubmit={handleSubmit}>
                    <FormControl>
                    <TextField 
                    label="First Name" variant="outlined" {...getFieldProps("firstName")}
                    />
                    </FormControl>

                    <FormControl>
                    <TextField 
                    label="Last Name" variant="outlined" {...getFieldProps("lastName")}
                    />
                    </FormControl>

                    <FormControl>
                    <TextField 
                    label="Email" variant="outlined" {...getFieldProps("email")}
                    />
                    </FormControl>

                    <FormControl>
                    <TextField 
                    label="Password" variant="outlined" {...getFieldProps("password")}
                    />
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                        {...getFieldProps("role")}
                        label="Role"
                        onChange={(event)=>{setFieldValue("role",event.target.value)}}
                        >
                            <MenuItem value="buyer">Buyer</MenuItem>
                            <MenuItem value="seller">Seller</MenuItem>
                            </Select>
                    </FormControl>
                    <Button type='submit' variant='contained'>Register</Button>
                </form>
            )
        }

    </Formik>
  )
}

export default Register