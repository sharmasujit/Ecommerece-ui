import { FormControl, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'
import * as Yup from 'yup';

const AddProduct = () => {
  return (
    <>
    <Formik
    initialValues={{
        name:"",
        brand:"",
        price:0,
        quantity:1,
        category:"",
        image:null,
        description:""
    }}
    validationSchema={
        Yup.object({
            name: Yup.string()
            .max(30, "Name must be at max 30 characters.").required("Name is required.").trim(),
        
            brand: Yup.string()
            .max(30, "Brand must be at max 30 characters.").required("Brand is required.").trim(),
            
            price: Yup.number().min(0).required("Price is required."),
            
            quantity: Yup.number().min(1).required("Quantity is required."),
            
            category: Yup.string().oneOf(["electronics","clothing","grocery","cosmetics","toys","furniture","sports","stationery",]),
            
            image: Yup.string().nullable(),
            
            description: Yup.string()
            .required("Description is required.")
            .trim().max(1000, "Description must be at max 1000 characters."),
        })
    }

    onSubmit={(values)=>{
        console.log(values);
    }}
    >
        {({handleSubmit,touched,errors,getFieldProps})=>(
            <form onSubmit={handleSubmit}
            style={{
                
            }}
            >
                <Typography variant='h4'>Add Product</Typography>
                <FormControl>
                    <TextField label="Name" variant='outlined' {...getFieldProps("name")}/>
                </FormControl>
                

            </form>
        )

        }

    </Formik>
    </>
  )
}

export default AddProduct;