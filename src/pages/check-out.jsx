import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  const handleBackToOrderHistory = () => {
    navigate('/order-history'); 
  };

  return (
    <div className="checkout-success">
      <h1>Checkout successfully!!!</h1>
      <button onClick={handleBackToOrderHistory}>
        Order History
      </button>
    </div>
  );
};

export default CheckoutSuccess;
