import React from 'react'
import Home from "./pages/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Register from './User/Register';
const App = () => {
  return (
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/products" element={<Products/>} />
         {/* <Route path="/products/:name" element={<Products/>} /> */}
         <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
