import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/order_view.css';



const OrderView = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  // Get data
  const orderData = location.state;
  const phone = orderData.order.customer_phone;
  const order_id = orderData.order.id;
  const staff = orderData.order.staff_name;
  const total = orderData.order.total_amount;



  

  useEffect(() => {
    fetchOrderItems();
  }, []);

// Reload items to cart item if it's already
const fetchOrderItems = async () => {
    const response = await axios.get('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/orderhistoryview/ordercart', {
     params: { orderId: order_id }
    });
    console.log(response.data.items);
    setCartItems(response.data.items);

  };

  const groupCartItems = (items) => {
    const grouped = {};
    items.forEach(item => {
      if (grouped[item.name]) {
        grouped[item.name].quantity += item.quantity;
      } else {
        grouped[item.name] = { ...item };
      }
    });
    return Object.values(grouped);
  };
  
const handleVoid = async () => {
    try {
      setLoading(true);
      await axios.post('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/orderhistoryview/void-order', {
        orderId: order_id
      });
      alert('Order has been voided successfully.');
      navigate('/order-history');
    } catch (error) {
      console.error('Void failed:', error);
      alert(error.response?.data?.error || 'Void failed.');
    } finally {
      setLoading(false);
    }
  };

  // Handle  when click Backhome button
  const handleBackbutton = () =>{
      navigate('/order-history');
  };

  return (
    <div className="order-view">
      <div className="header">
        <h2>Order</h2><br />
      </div>
      <div className='row-2'> 
        <div className="staff">
          <label>Staff: {staff} </label>
      </div>

      <div className="orderinfor">
        {/* Order ID */}
        <div className="order-id">
          <h3>Order ID: {order_id} </h3>
        </div>

      {/* Customer Information */}
        <div className="customer-info">
          <p>Customer's name: {orderData.name}</p>
          <p>Customer's phone: {phone}</p>
        </div>
      </div>
      </div>
     <div className='row-3'>

      {/* Cart View */}
      <div className="cart">
        <h3>Cart</h3>
        <ul >
            {groupCartItems(cartItems).map((item, index) => (
                <li key={index}>
                {item.name} - ${item.price} x {item.quantity}
                </li>
            ))}
        </ul>
        
        <p><strong>Total:{total}</strong></p>

        {/* Check-out Button */}
        <div className='checkout-session'>
          <div className='backButton'>
            <button onClick={handleBackbutton}>Back home</button>
          </div>

          {/* Check out button */}
          <div className="checkout-btn">
          <button onClick={handleVoid} disabled={loading}>
            Void Order
          </button>
          </div>
        </div>
       

      </div>
     </div>
     
      

    </div>
  );
};

export default OrderView;
