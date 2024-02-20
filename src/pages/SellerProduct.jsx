import { Box, Button, FormControl, Input, InputAdornment, Pagination, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import $axios from '../../lib/axios.instance';
import Loader from '../Component/Loader';
import ProductCard from '../Component/ProductCard';
import { openErrorSnackbar } from '../store/slices/snackbar.slices';
import SearchIcon from '@mui/icons-material/Search';

const SellerProduct = () => {
    const [searchText,setSearchText]=useState("")
    const [page, setPage] = useState(1);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isLoading, data } = useQuery({
        queryKey: ["seller-product-list", page,searchText],
        queryFn: async () => {
            return await $axios.post("/product/seller/list",
                {
                    page,
                    limit: 3,
                    searchText
                }
            )
        },
        onError: (error) => {
            dispatch(openErrorSnackbar(error?.response?.data?.message));
        }
    })
    const productList = data?.data?.products;

    const totalPage = data?.data?.numberOfPages;

    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <FormControl
                variant="standard"
                sx={{
                    display:"grid",
                    placeItems:"flex-end",
                    mb:"2rem"
                }}
            >
                <Input
                onChange={(event)=>{setSearchText(event?.target?.value);}}
                    id="input-with-icon-adornment"
                    placeholder='search...'
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }} >

                <Stack justifyContent="center" alignItems="center">
                    <Button variant='contained' color='success'
                        sx={{ width: { xs: "100%", md: "15%" } }}
                        onClick={() => { navigate("/product/add") }}
                    >
                        Add Product
                    </Button>

                    <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "1rem", mt: "30px" }} sm={12} md={6}>
                        {productList.map((item) => {
                            return (<ProductCard key={item._id} {...item} />)
                        })}
                    </Stack>
                </Stack>
            </Box>

            <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} mt={"3rem"}>
                <Pagination
                    page={page}
                    onChange={(event, values) => { setPage(values); }}
                    count={totalPage}
                    color="secondary"
                />
            </Stack>
        </>
    )
}

export default SellerProduct;