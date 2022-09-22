import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Product from './Components/Product'
import ProductDetailes from './Pages/ProductDetailes'
import ProductForm from './Pages/ProductForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path='/product' element={<Product />} />
          <Route path='/productdetails/:id' element={<ProductDetailes />} />
          <Route path='/productForm/:id' element={<ProductForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
