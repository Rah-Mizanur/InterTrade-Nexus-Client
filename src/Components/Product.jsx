import React from 'react'
import { useNavigate } from 'react-router'

const Product = ({product}) => {
    const navigate = useNavigate()

    const handleSeeDetails =()=>{
        navigate('/product-details/:id')
           navigate(`/product-details/${product._id}`,{state : product});
    }
  return (
     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-xs">
      <img
        src={product.productImage}
        alt={product.productName}
        className="w-full h-48 object-cover"
      />

  
      <div className="p-4 space-y-2">
   
        <h2 className="text-lg font-semibold">{product.productName}</h2>

        <p className="text-green-600 font-bold">${product.price}</p>

        <p className="text-gray-700">Origin: {product.originCountry}</p>

      
        <p className="text-yellow-500">Rating: {product.rating} ⭐</p>

      
        <p className="text-gray-700">Available: {product.availableQuantity}</p>

 
        <button onClick={handleSeeDetails} className="w-full bg-accent text-white py-2 rounded hover:bg-secondary transition-colors duration-200">
          See Details
        </button>
      </div>
    </div>
  )
}

export default Product
