import { Box, CircularProgress } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query'
import $axios from '../../lib/axios.instance'
import Header from '../Component/Header'
import ProductCard from '../Component/ProductCard'

const BuyerProduct = () => {
  const {isLoading,isError,error,data}=useQuery({
    queryKey:["buyer-product-list"],
    queryFn:async()=>{
      return await $axios.post("/product/buyer/list",{
        page:1,
        limit:10,
      })
    }
  })
  const productList=data?.data?.products;

  if(isLoading)
  {
    return <CircularProgress color='secondary'/>
  }
  return (
    <>
      <Header />
      <Box sx={{display:"flex",gap:"1rem", flexWrap:"wrap", justifyContent:"center",alignItems:"center" }} sm={12} md={6}>
        {productList.map((item)=>{
          return <ProductCard key={item._id} {...item} />
        })}
        
      </Box>
    </>
  )
}

export default BuyerProduct