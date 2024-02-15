import { Box } from '@mui/material'
import React from 'react'
import ProductImage from '../Component/ProductImage'
import ProductDescription from '../Component/ProductDescription'
import $axios from '../../lib/axios.instance'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Loader from '../Component/Loader'

const ProductDetail = () => {
    const { id } = useParams();
    const {isLoading,data}=useQuery ({
        queryKey: ["product-details"],
        queryFn: async () => {
            return await $axios.get(`/product/details/${id}`);
        },

    })

    const productData=data?.data?.product;

    if(isLoading)
    {
        return <Loader/>
    }
    return (
        <Box sx={{
            display: "flex", justifyContent: "center", alignItems: "center",
            gap: "1rem", padding: "2rem", width: "85%", marginTop: "10px",
            boxShadow: " rgb(38, 57, 77) 0px 20px 30px -10px"
        }}>
            <ProductImage imageUrl={productData?.image}/>
            <ProductDescription {...productData}/>
        </Box>
    )
}

export default ProductDetail