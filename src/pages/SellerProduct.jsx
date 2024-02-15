import { Box, Button, CircularProgress, Stack } from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import $axios from '../../lib/axios.instance';
import ProductCard from '../Component/ProductCard';
import { openErrorSnackbar } from '../store/slices/snackbar.slices';

const SellerProduct = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, data } = useQuery({
        queryKey: ["seller-product-list"],
        queryFn: async () => {
            return await $axios.post("/product/seller/list",
                {
                    page: 1,
                    limit: 5
                })
        },
        onError: (error) => {
            dispatch(openErrorSnackbar(error?.response?.data?.message));
        }
    })
    const productList = data?.data?.products;
    console.log(productList);

    if(isLoading)
    {
        return (<CircularProgress/>)
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
            
            <Stack justifyContent="center" alignItems="center">
                <Button variant='contained' color='success'
                    sx={{ width: { xs: "100%", md: "15%" } }}
                    onClick={() => { navigate("/product/add") }}
                >
                    Add Product
                </Button>

                <Stack sx={{display:"flex", flexDirection:"row", gap:"1rem",mt:"30px"}}>
                {productList.map((item) => {
                    return (<ProductCard key={item._id} {...item} />)
                })}
            </Stack>
            </Stack>

        </Box>
    )
}

export default SellerProduct;