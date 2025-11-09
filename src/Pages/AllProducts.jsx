import React from 'react'
import { useLoaderData } from 'react-router'
import Product from '../Components/Product'

const AllProducts = () => {
    const products = useLoaderData()
    console.log(products)
  return (
    <div className='w-11/12 mx-auto'>
        <h1 className='text-2xl font-bold text-center text-secondary'> All Products </h1>
        <div className='grid grid-cols-3 gap-4 my-8'>
        {
            products.map( product =>( <Product key={products._id} product = {product}></Product>))
        }
        </div>
    </div>
  )
}

export default AllProducts
