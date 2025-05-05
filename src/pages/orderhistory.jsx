import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/orderHistory.css'; 
import Logo from './images/logo.jpg';



const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const navigate = useNavigate();


    const fetchOrderData = async () => {
        try{
          const orderHistoryResult = await axios.get('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/orderhistoryview');

          setOrderHistory(orderHistoryResult.data);
          
        }catch (err) {
          console.error('Failed to fetch orders:', err);
          alert("Session expired or unauthorized. Please log in again.");
        }
    };

      useEffect(() => {
        fetchOrderData();
      }, []);

      const viewCardHandle = (order) =>{
    
        navigate("/view-orderhistory", {
          state: {
            order,
            name: order.customer_name,
            phone: order.phone,
           
          }
       })
         
      };



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
                {orderHistory.length === 0 ? (
                <p>No active orders.</p>
              ) : (
                orderHistory.map((order) => (
                  
                  <div key={order.id} className="order-box">
                    <p>Order ID: {order.id}</p>
                    <p>Customer: {order.customer_name}</p>
                    <button className="view-card-button" onClick={()=>viewCardHandle(order)}>View Order</button>
                </div>
                ))
              )}
        
            </div>
    
        </div>
    
      );
    
    }
    
    export default OrderHistory;