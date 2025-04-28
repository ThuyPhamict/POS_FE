
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/homepage.css'; 
import Logo from './images/logo.jpg'

const HomePage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Function to fetch order data from the backend
  const fetchOrderData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in first.");
      return navigate('/');
    }


    try {
      // const response = await axios.get('http://localhost:3000/api/orders',{
      const response = await axios.get('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/orders',{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data); 
      setOrders(response.data);
      
    }catch (err) {
      console.error('Failed to fetch orders:', err);
      alert("Session expired or unauthorized. Please log in again.");
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to fetch the order data when the component mounts
  useEffect(() => {
    fetchOrderData();
  }, []);

  if (loading) {
    return <p>Loading orders...</p>;
  }
  

  // Function to create a new order and increase the Order ID
  const createNewOrder = () => {
    // You can use the last order ID to generate a new one (or do it in the backend)
    const lastOrderId = orders.length > 0 ? orders[orders.length - 1].id : 100;
    const newOrderId = lastOrderId + 1;

    localStorage.setItem('newOrderId', newOrderId);
    navigate('/enter-customer-phone');
  };


  return(
    <div className="homepage">
   
        <div className="logo">
        <img 
            src= {Logo}
            alt="Avatar"
            />
        </div>

     
      <nav className="menu">
        <ul className="menu-list">
          <li><a href="/home">Home</a></li>
          <li><a href="/order-history">Order History</a></li>
          <li><a href="/voided-order">Voided Order</a></li>
        </ul>
      </nav>

     
        <div className="order-details">
            {orders.length === 0 ? (
            <p>No active orders.</p>
          ) : (
            orders.map((order) => (
              
              <div key={order.id} className="order-box">
                <p>Order ID: {order.id}</p>
                <p>Customer: {order.customer_name}</p>
                <p>Staff: {order.staff_name || 'Not Assigned'}</p>
                <p>Service: {order.service || 'No Service Selected'}</p>
                <button className="view-cart-button">View Cart</button>
              </div>
            ))
          )}
        </div>


      <div className="new-order-section">
        <button className="create-order-button" onClick={createNewOrder}>
          Create New Order
        </button>
      </div>
    </div>

  );

}

export default HomePage;
