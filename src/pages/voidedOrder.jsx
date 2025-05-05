import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './styles/voidedOrder.css'; 
import Logo from './images/logo.jpg';



const VoidedOrder = () => {
    const [voidedOrder, setVoidedOrder] = useState([]);

    const fetchOrderData = async () => {
      try{
        const orderHistoryResult = await axios.get('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/voidedorderview');
        setVoidedOrder(orderHistoryResult.data);

      }catch (err) {
        console.error('Failed to fetch orders:', err);
        alert("Session expired or unauthorized. Please log in again.");
      }
      };

      useEffect(() => {
        fetchOrderData();
      }, []);



      return(
        <div className="voided-order">
       
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
                {voidedOrder.length === 0 ? (
                <p>No active orders.</p>
              ) : (
                voidedOrder.map((order) => (
                  
                  <div key={order.id} className="order-box">
                    <p>Order ID: {order.id}</p>
                    <p>Customer: {order.customer_name}</p>
                  </div>
                ))
              )}
            </div>
    
        </div>
    
      );
    
    }
    
    export default VoidedOrder;