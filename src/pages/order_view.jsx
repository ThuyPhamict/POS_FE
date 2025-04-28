import React, { useState } from 'react';
import './styles/order_view.css';

const OrderView = () => {
  // State for storing customer info and cart items
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone:"",
  });

  const [orderId, setOrderId] = useState('OD100'); // Order ID
  const [cartItems, setCartItems] = useState([
    { name: 'Manicure', quantity: 2, price: 55.00},
    { name: 'Pedicure', quantity: 1, price: 75.00},
  ]);
  const [staffs, setStaffs] = useState(['John', 'Alice', 'Bob']); // staff names

  const handleCheckOut = () => {
    alert('Checking out...');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="order-view">
      <h2>Order View</h2>

      {/* Staff Dropdown */}
      <div className="staff-dropdown">
        <label htmlFor="staff">Staff: </label>
        <select id="staff">
          {staffs.map((staff, index) => (
            <option key={index} value={staff}>
              {staff}
            </option>
          ))}
        </select>
      </div>

      {/* Menu Products */}
      <div className="menu-products">
        <h3>Menu</h3>
        <ul>
          <li>Manicure</li>
          <li>Gel Manicure</li>
          <li>Dip Nail Manicure</li>
          <li>Spa Pedicure</li>
          <li>Pedicure</li>
          <li>Gel Pedicure</li>
          <li>French Tip</li>
          <li>Nail Art</li>
        </ul>
      </div>

       {/* Order ID */}
       <div className="order-id">
        <h3>Order ID</h3>
        <p>{orderId}</p>
      </div>

      {/* Customer Information */}
      <div className="customer-info">
        <p>Customer's name: {customerInfo.name}</p>
        <p>Customer's phone: {customerInfo.phone}</p>
      </div>

     

      {/* Cart View */}
      <div className="cart-view">
        <h3>Cart</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <p><strong>Total: ${calculateTotal()}</strong></p>
      </div>

      {/* Check-out Button */}
      <div className="checkout-btn">
        <button onClick={handleCheckOut}>Check-out</button>
      </div>
    </div>
  );
};

export default OrderView;
