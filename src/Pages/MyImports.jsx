import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../Provider/AuthProvider'
import ImportProduct from '../Components/ImportProduct'


const MyImports = () => {
    const {user} = use(AuthContext)
    const [products , setProducts] = useState([])
      const [loading,setLoading]= useState(true)

    useEffect(()=>{
        fetch(`http://localhost:3000/my-imports?email=${user.email}`,{
            headers :{
                authorization : `Bearer ${user.accessToken}`
            }
        })
        .then(res=>res.json())
        .then(data =>{
            setProducts(data),
            setLoading(false)
        } )
    },[user])
    if(loading){
        return <h1> Loading ...............</h1>
    }
  return (
    
         <div className="w-11/12 mx-auto">
          <title>InterTrade || My Imports</title>
            <h1 className="my-8 text-center text-2xl"> My Products </h1>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {
            products.map((products) => (
              <ImportProduct key={products._id} products={products}>
                {" "}
              </ImportProduct>
            ))}
            </div>
            </div>
  )
}

export default MyImports
