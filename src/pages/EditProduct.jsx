import { Button, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import * as Yup from "yup"
import $axios from '../../lib/axios.instance'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Component/Loader'
import { useDispatch } from 'react-redux'
import { openErrorSnackbar, openSuccessSnackbar } from '../store/slices/snackbar.slices'

const EditProduct = () => {
    const categoriesList = ["electronics", "clothing", "grocery", "cosmetics", "toys", "furniture", "sports", "stationery",];

    const { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, data } = useQuery({
        queryKey: ["product-detail"],
        queryFn: async () => {
            return await $axios.get(`/product/details/${id}`);
        }
    })

    const productData = data?.data?.product;

    const { isLoading: editProductLoading, mutate: editProduct } = useMutation({
        mutationKey: ["edit-product"],
        mutationFn: async (values) => {
            return await $axios.put(`/product/edit/${id}`,values);
        },

        onSuccess: (response) => {
            dispatch(openSuccessSnackbar(response?.data?.message));
            navigate(`/product/details/${id}`);
        },

        onError: (error) => {
            dispatch(openErrorSnackbar(error?.response?.data?.error))
        }
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <Formik initialValues={{
                name: productData?.name || "",
                brand: productData?.brand || "",
                price: productData?.price || 0,
                quantity: productData?.quantity || 1,
                category: productData?.category || "",
                image: productData?.image || null,
                description: productData?.description || ""
            }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .max(30, "Name must be at max 30 characters.").required("Name is required.").trim(),

                    brand: Yup.string()
                        .max(30, "Brand must be at max 30 characters.").required("Brand is required.").trim(),

                    price: Yup.number().min(0).required("Price is required."),

                    quantity: Yup.number().min(1).required("Quantity is required."),

                    category: Yup.string().oneOf(categoriesList),

                    image: Yup.string().nullable(),

                    description: Yup.string()
                        .required("Description is required.")
                        .trim().max(1000, "Description must be at max 1000 characters."),
                })}
                onSubmit={(values) => {
                    console.log(values);
                    editProduct(values);
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
                        <Typography variant='h4'sx={{textAlign:"center"}}>Edit Product</Typography>
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

                        <Button type='submit' variant='contained' color='success'>
                            Edit Product
                        </Button>
                    </form>
                )}

            </Formik>
        </>
    )
}

export default EditProduct