import SearchIcon from '@mui/icons-material/Search'
import { Box, FormControl, Input, InputAdornment, Pagination, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import $axios from '../../lib/axios.instance'
import Loader from '../Component/Loader'
import ProductCard from '../Component/ProductCard'

const BuyerProduct = () => {

  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1)

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["buyer-product-list", page, searchText],
    queryFn: async () => {
      return await $axios.post("/product/buyer/list", {
        page,
        limit: 6,
        searchText
      })
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
          margin: "0 3rem 3rem 0",
          display: "grid",
          placeContent: "flex-end"
        }}
      >
        <Input
          onChange={(event) => { setSearchText(event?.target?.value || ""); }}
          value={searchText}
          id="input-with-icon-adornment"
          placeholder='search....'
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <Box sx={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
      }}
        sm={12} md={6}
      >
        {productList.map((item) => {
          return <ProductCard key={item._id} {...item} />
        })}

      </Box>
      <Stack justifyContent={"center"} alignItems={"center"} mt={"3rem"}>
        <Pagination
          page={page}
          count={totalPage}
          color="secondary"
          onChange={(event, value) => { setPage(value) }}
        />
      </Stack>
    </>
  )
}

export default BuyerProduct