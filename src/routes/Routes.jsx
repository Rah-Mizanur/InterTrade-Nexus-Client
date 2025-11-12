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
import PrivateRoute from "../Pages/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root> </Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () =>
          fetch("https://intertrade-nexus-server.vercel.app/latest-products"),
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
        loader: () =>
          fetch("https://intertrade-nexus-server.vercel.app/all-products"),
      },
      {
        path: "/my-imports",
        element: (
          <PrivateRoute>
            <MyImports></MyImports>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-exports",
        element: (
          <PrivateRoute>
            <MyExports></MyExports>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-export",
        element: (
          <PrivateRoute>
            <AddExport></AddExport>
          </PrivateRoute>
        ),
      },
      {
        path: "/product-details/:id",
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
