import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route,Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Buynow from './pages/Buynow'
import Whislist from './pages/Whislist'
import MyOrders from './pages/MyOrders'
import ProductDetails from './pages/ProductDetails'
function App() {
  return (
    <div>
          <Navbar/>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/Buynow' element={<Buynow/>}/>
            <Route path='/whislist' element={<Whislist/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
            <Route path='/productdetails/:id' element={<ProductDetails/>}/>
          </Routes>
    </div>
  )
}

export default App
