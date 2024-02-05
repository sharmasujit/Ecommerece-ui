import { Button, FormControl, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import * as Yup from "yup"

const Login = () => {
  return (
    <>
    <Formik
    initialValues={
      {
        email:"",
        password:""
      }
    }
    validationSchema={Yup.object({
      email:Yup.string().email("Must be valid email").lowercase().trim().required("Email is required"),
      password:Yup.string().trim().required("Password is required"),
    })}

    onSubmit={(values)=>{
      console.log(values);
    }}
    >
      {({handleSubmit,getFieldProps,errors,touched})=>(
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
          <Typography variant='h4'>Sign in</Typography>
          <FormControl>
            <TextField 
            color='success'
            label="Email" variant="outlined" 
            error={!!touched.email && !!errors.email}
            helperText={errors.email}
            {...getFieldProps("email")}
          />
          </FormControl>
          
          <FormControl>
            <TextField 
            color='success'
            error={!!touched.password && !!errors.password}
            helperText={errors.password}
            label="Password" variant="outlined" 
            {...getFieldProps("password")}
          />
          </FormControl>
          <Button variant='contained' type='submit' color='success'>Log In</Button>
        </form>
      )}

    </Formik>
    </>
  )
}

export default Login