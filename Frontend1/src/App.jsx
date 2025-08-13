import React, { useEffect } from 'react'
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Register from './User/Register';
import Login from './User/Login';
import { useDispatch, useSelector } from 'react-redux';
import UserDashboard from './User/userDashboard';
import { loadUser } from './features/user/userSlice';
import Profile from './User/Profile';
import ProtechtedRoute from './components/ProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';
import UpdateProfile from './User/UpdateProfile';
import UpdatePassword from './User/UpdatePassword';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from './User/ResetPassword';
import Cart from './cart/Cart';
import Shipping from './cart/Shipping';
import Orderconfirm from './cart/Orderconfirm';
import Payment from './cart/Payment';
import PaymentSuccess from './cart/PaymentSuccess';
import MyOrders from './Orders/MyOrders';
import OrderDetails from './Orders/OrderDetails';
import Dashboard from './Admin/Dashboard';
import ProductsList from './Admin/ProductsList';
import CreateProduct from './Admin/CreateProduct';
import UpdateProduct from './Admin/UpdateProduct';
import UserList from './Admin/UserList';
import UpdateRole from './Admin/UpdateRole';



const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser())
    }
  }, [dispatch])

  console.log(isAuthenticated, user);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/updateprofile" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/updatepassword" element={<ProtectedRoute element={<UpdatePassword />} />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
        <Route path="/shipping" element={<ProtectedRoute element={<Shipping />} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={<Orderconfirm />} />} />
        <Route path="/process/payment" element={<ProtectedRoute element={<Payment />} />} />
        <Route path="/paymentSuccess" element={<ProtectedRoute element={<PaymentSuccess />} />} />
        <Route path="/orders/user" element={<ProtectedRoute element={<MyOrders />} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />
        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute element={<Dashboard />} adminOnly={true} />} />
        <Route path="/admin/getallproduct" element={<ProtectedRoute element={<ProductsList />} adminOnly={true} />} />
        <Route path="/admin/createproduct" element={<ProtectedRoute element={<CreateProduct />} adminOnly={true} />} />
         <Route path="/admin/product/:updateId" element={<ProtectedRoute element={<UpdateProduct />} adminOnly={true} />} />
         <Route path="/admin/getallusers" element={<UserList element={<UpdateProduct />} adminOnly={true} />} />
         <Route path="/admin/user/:id" element={<UpdateRole element={<UpdateProduct />} adminOnly={true} />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
