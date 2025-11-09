import React, { use, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../Provider/AuthProvider'

const ProductDetails = () => {

      const navigate = useNavigate()
    const {id} = useParams()
    const [product , setProduct] = useState({})
    const [loading,setLoading]= useState(true)
    const {user} = use(AuthContext)
    // console.log(product)

    useEffect(()=>{
          fetch(`http://localhost:3000/all-products/${id}`)
          .then(res=>res.json())
          .then (data=>{
            setProduct (data)
            setLoading(false)
          })
    },[])
  return (
    <div className='w-11/12 mx-auto'>
         <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Product Image */}
        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-64 object-cover"
        />

        {/* Product Info */}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">{product.productName}</h1>

          <p className="text-green-600 font-semibold text-lg">
            Price: ${product.price}
          </p>

          <p className="text-gray-700">
            Origin Country: <span className="font-medium">{product.originCountry}</span>
          </p>

          <p className="text-yellow-500">
            Rating: <span className="font-medium">{product.rating} ⭐</span>
          </p>

          <p className="text-gray-700">
            Available Quantity: <span className="font-medium">{product.availableQuantity}</span>
          </p>

          <p className="text-gray-700">
            Exported By: <span className="font-medium">{product.exportedBy}</span>
          </p>

          <p className="text-gray-500 text-sm">
            Created At: {new Date(product.createdAt).toLocaleDateString()}
          </p>

          {/* See Details / Action Button */}
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200">
            See More Details
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProductDetails
