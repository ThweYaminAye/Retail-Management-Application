import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import DefaultLayout from "@/layouts/DefaultLayout"
import LoginView from "@/modules/auth/login/LoginView"
import AllProducts from "@/modules/product/AllProducts"
import StockView from "@/modules/stock/StockView"
import { QueryClient , QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { store } from "@/store"
import { Toaster } from "./ui/toaster"
import CartView from "@/modules/cart/Cartview"
import Cashier from "@/modules/cart/Cashier"
import SaleReport from "@/modules/sale/SaleReport"
import AuthLayout from "@/layouts/AuthLayout"
import SignUpView from "@/modules/auth/signup/SignUpView"
// import { Loader } from "lucide-react"


const Wrapper = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element : <DefaultLayout/>,
      children :[
        {
          path : "products",
          element : <AllProducts/>
        },
        {
          path : "stock",
          element : <StockView/>
        },
        {
          path : "cartview",
          element : <CartView/>
        },
        {
          path : "cashier",
          element : <Cashier/>
        },
        {
          path : "sale",
          element : <SaleReport/>
        },
      ]
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Navigate to="login" replace />,
        },
        {
          path: "login",
          element: <LoginView />,
        },
        {
          path: "signup",
          element: <SignUpView/>,
        }
      ],
    },
  ])

  const queryClient = new QueryClient();
  return (
    
    <>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <Loader/> */}
      <Toaster/>
      <RouterProvider router={router} future={{ v7_startTransition: true }}></RouterProvider>
    </QueryClientProvider>
    </Provider>
    </>
  )
}

export default Wrapper