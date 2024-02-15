import React from 'react'
import SellerProduct from './SellerProduct';
import BuyerProduct from './BuyerProduct';
import { Box } from '@mui/material';

const ProductList = () => {
    const userRole = localStorage.getItem("role");

    return (
        <Box sx={{padding:"2rem"}}>
            {userRole === "seller" ? <SellerProduct /> : <BuyerProduct />}
        </Box>
    )

}

export default ProductList