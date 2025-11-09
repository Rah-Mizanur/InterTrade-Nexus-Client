import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import AllProducts from "../Pages/AllProducts";
import MyImports from "../Pages/MyImPorts";
import MyExports from "../Pages/MyExports";
import AddExport from "../Pages/AddExport";
import ProductDetails from "../Pages/ProductDetails";
import Home from "../Pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element : <Root> </Root>,
        children:[
            {
                index: true ,
                element : <Home></Home>
            },
            {
                path: '/all-products',
                element : <AllProducts></AllProducts>
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
            }
        ]
    }
])

export default router