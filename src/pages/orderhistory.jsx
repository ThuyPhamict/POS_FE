import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './styles/orderHistory.css'; 
import Logo from './images/logo.jpg';



const OrderHistory = () => {
    const [orderData, setOrderData] = useState({
      orderId: 100, // Default Order ID
      customerName: 'Unknown', // Default customer name
      staff: '', // Empty staff field
      service: '' // Empty service field
    });


    const fetchOrderData = async () => {
        try {
          const response = await axios.get('/api/order'); // Replace with your API endpoint
          const data = response.data;
    
          // Update state with data, using defaults for missing fields
          setOrderData({
            orderId: data.orderId || 100, // Default to 100 if no orderId
            customerName: data.customerName || 'Unknown', // Default to 'Unknown' if no customerName
            staff: data.staff || '', // Empty if no staff
            service: data.service || '' // Empty if no service
          });
        } catch (error) {
          console.error('Error fetching order data:', error);
          // In case of an error, we retain the default values
        }
      };

      useEffect(() => {
        fetchOrderData();
      }, []);


      return(
        <div className="orderhistory">
       
            <div className="logo">
            <img 
                src= {Logo}
                alt="Avatar"
                />
            </div>
    
         
          <nav className="menu">
            <ul className="menu-list">
              <li><a href="/home">Home</a></li>
              <li><a href="/orderHistory">Order History</a></li>
              <li><a href="/voided-order">Voided Order</a></li>
            </ul>
          </nav>
    
         
            <div className="order-details">
              <p>Order ID: {orderData.orderId}</p>
              <p>Customer: {orderData.customerName}</p>
              <p>Staff: {orderData.staff || 'Not Assigned'}</p>
              <p>Service: {orderData.service || 'No Service Selected'}</p>
              <button className="void-order-button">Void Order</button>
            </div>
    
        </div>
    
      );
    
    }
    
    export default OrderHistory;