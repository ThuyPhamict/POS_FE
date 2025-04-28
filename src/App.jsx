import React, {useState} from 'react'
import Login from './pages/login';
import Home from './pages/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderView from './pages/order_view';
import EnterCustomerPhone from './pages/customer_signIn_phone'
import EnterCustomerName from './pages/customer_signIn_name';
import OrderHistory from './pages/orderhistory';
import VoidedOrder from './pages/voidedOrder';
import './App.css';

function App() {

  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
      <div>
       <Router>
        <Routes>
          <Route exact path="/" element={<Login setToken={setToken} />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/order-view" element={<OrderView/>} />
          <Route path="/enter-customer-phone" element={<EnterCustomerPhone/>} />
          <Route path="/enter-customer-name" element={<EnterCustomerName/>} />
          <Route path="/order-history" element={<OrderHistory/>} />
          <Route path="/voided-order" element={<VoidedOrder/>} />
        </Routes>
      </Router>
      </div>
      
  )
}

export default App
