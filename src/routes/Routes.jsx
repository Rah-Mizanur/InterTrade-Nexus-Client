import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import AllProducts from "../Pages/AllProducts";
import MyImports from "../Pages/MyImPorts";
import MyExports from "../Pages/MyExports";
import AddExport from "../Pages/AddExport";
import ProductDetails from "../Pages/ProductDetails";
import Home from "../Pages/Home";

import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element : <Root> </Root>,
        children:[
            {
                index: true ,
                element : <Home></Home>,
                loader : ()=> fetch('http://localhost:3000/latest-products')

            },
            {
                path: '/all-products',
                element : <AllProducts></AllProducts>,
                loader : ()=> fetch('http://localhost:3000/all-products')

            },
            {
                path:'/my-imports',
                element : <MyImports></MyImports>
            },
            {
                path:'/my-exports',
                element : <MyExports></MyExports>
            },
            {
                path:'/add-export',
                element : <AddExport></AddExport>
            },
            {
                path: '/product-details/:id',
                element: <ProductDetails></ProductDetails>
            },
            {
                path :'/login',
                element : <Login></Login>
            },
            {
                path :"/register",
                element: <Register></Register>
            }
        ]
    }
])

export default router