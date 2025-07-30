import React from 'react'
import Home from "./pages/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Footer from './components/Footer';
import ProductDetails from './pages/ProductDetails';
const App = () => {
  return (
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
