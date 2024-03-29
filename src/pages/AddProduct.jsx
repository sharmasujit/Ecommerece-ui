import { Box, Button, FormControl, FormHelperText, InputAdornment, InputLabel, LinearProgress, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import $axios from '../../lib/axios.instance';
import { openErrorSnackbar, openSuccessSnackbar } from '../store/slices/snackbar.slices';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const AddProduct = () => {
    const categoriesList = ["electronics", "clothing", "grocery", "cosmetics", "toys", "furniture", "sports", "stationery",];
    const [productImage, setProductImage] = useState(null);
    const [localUrl, setLocalUrl] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, mutate: addProduct } = useMutation({
        mutationKey: ["addproduct"],
        mutationFn: async (values) => {
            return await $axios.post("/product/add", values)
        },
        onSuccess: (response) => {
            dispatch(openSuccessSnackbar(response?.data?.message));
            navigate("/product/list");
        },
        onError: (error) => {
            dispatch(openErrorSnackbar(error?.response?.data?.message))
        }
    })

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "50px" }}>
            {isLoading && <LinearProgress color='secondary' />}
            <Formik
                initialValues={{
                    name: "",
                    brand: "",
                    price: 0,
                    quantity: 1,
                    category: "",
                    image: null,
                    description: ""
                }}
                validationSchema={
                    Yup.object({
                        name: Yup.string()
                            .max(30, "Name must be at max 30 characters.")
                            .required("Name is required.").trim(),

                        brand: Yup.string()
                            .max(30, "Brand must be at max 30 characters.")
                            .required("Brand is required.").trim(),

                        price: Yup.number().min(0).required("Price is required."),

                        quantity: Yup.number().min(1).required("Quantity is required."),

                        category: Yup.string()
                            .oneOf(categoriesList),

                        image: Yup.string().nullable(),

                        description: Yup.string()
                            .required("Description is required.")
                            .trim().max(1000, "Description must be at max 1000 characters."),
                    })
                }

                onSubmit={async(values) => {
                    // if (productImage) {
                    //     const cloudName = "dzmqrmwps";
                    //     //create form data object
                    //     const data = new FormData()
                    //     data.append("file", productImage);
                    //     data.append("upload_preset", "nep_mart");
                    //     data.append("cloud_name", cloudName);
                    // }
                    // try {
                    //    const response= await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,data);
                    //    console.log(response);
                       
                    // } catch (error) {
                    //     dispatch(openErrorSnackbar(error.message)); 
                    // }

                    addProduct(values);
                }}
            >
                {({ handleSubmit, touched, errors, getFieldProps }) => (
                    <form onSubmit={handleSubmit}
                        style={{
                            marginTop: "5rem",
                            display: "flex",
                            flexDirection: "column",
                            padding: "2rem",
                            gap: "2rem",
                            width: "500px",
                            boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                        }}
                    >
                        <Typography variant='h4' sx={{ textAlign: "center" }}>Add Product</Typography>
                        <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {productImage && <img src={localUrl} alt='' />}
                        </Stack>

                        {/* <FormControl>
                            <input type='file'
                                onChange={(event) => {
                                    const file = event?.target?.files[0];
                                    setProductImage(file);
                                    setLocalUrl(URL.createObjectURL(file));
                                }}
                            />
                        </FormControl> */}
                        <FormControl>
                            <TextField
                                color='success'
                                label="Name" variant='outlined'
                                {...getFieldProps("name")} />
                            {touched.name && errors.name ?
                                (<FormHelperText error>{errors.name}</FormHelperText>) : null}
                        </FormControl>

                        <FormControl>
                            <TextField
                                color='success'
                                label="Brand" variant='outlined'
                                {...getFieldProps("brand")}
                            />
                            {touched.brand && errors.brand ?
                                (<FormHelperText error>{errors.brand}</FormHelperText>) : null}
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                type="number"
                                startAdornment={
                                    <InputAdornment position="start">Rs.</InputAdornment>
                                }
                                label="Price"
                                {...getFieldProps("price")}
                            />
                            {touched.price && errors.price ?
                                (<FormHelperText error>{errors.price}</FormHelperText>) : null}
                        </FormControl>

                        <FormControl>
                            <TextField
                                color='success'
                                label="Quantity" variant='outlined'
                                type='number'

                                {...getFieldProps("quantity")}
                            />
                            {touched.quantity && errors.quantity ?
                                (<FormHelperText error>{errors.quantity}</FormHelperText>) : null}
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel color='success'>Category</InputLabel>
                            <Select
                                color='success'
                                label="Category" {...getFieldProps("category")}
                            >
                                {categoriesList.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>
                                            <Typography sx={{ textTransform: "capitalize" }}>{item}</Typography>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <TextField
                                color='success'
                                label="Description"
                                variant='outlined'
                                multiline
                                rows={8}
                                {...getFieldProps("description")}
                            />
                            {touched.description && errors.description ?
                                (<FormHelperText error>{errors.description}</FormHelperText>) : null}
                        </FormControl>

                        <Button type='submit' variant='contained' color='success'>Add Product</Button>

                    </form>
                )
                }

            </Formik>
        </Box>
    )
}

export default AddProduct;