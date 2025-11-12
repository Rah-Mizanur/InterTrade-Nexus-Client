import React from 'react'
import { useLoaderData } from 'react-router'
import Product from '../Components/Product'

const AllProducts = () => {
    const products = useLoaderData()
  
  return (
    <div className='w-11/12 mx-auto'>
        <h1 className='text-2xl font-bold text-center text-secondary'> All Products </h1>
        <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-8 justify-items-center'>
        {
            products.map( product =>( <Product key={product._id} product = {product}></Product>))
        }
        </div>
    </div>
  )
}

export default AllProducts
