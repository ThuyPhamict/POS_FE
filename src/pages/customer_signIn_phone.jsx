import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/phonepage.css';

const NumberKeyboardPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  // Handle the number input on button click
  const handleNumberClick = (number) => {
    if (phoneNumber.length < 10) {
      setPhoneNumber((prevPhone) => prevPhone + number);
    }
  };

  // Handle Skip button click
  const handleSkip = async () => {
    const unknownName = "unknown";
    const unknownPhone = "unknown";

    try {
      // const res = await axios.post('http://localhost:3000/api/customerphonecheck/unknown-customers', {
      const res = await axios.post('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/customerphonecheck/unknown-customers', {
        name: unknownName,
        phone: unknownPhone,
        totalAmount: 0
      });
  
      const { order } = res.data;
  
      // Redirect to Order View page
      navigate("/order-view", {
        state: {
          order,
          name: unknownName,
          phone: unknownPhone
        }
      });
    } catch (error) {
      console.error("Error creating order for unknown customer:", error);
      alert("Something went wrong while skipping.");
    }
  };

  // Handle Ok button click (only if 10 digits entered)
  const handleOk = async () => {
    if (phoneNumber.length === 10) {
          try{
            // const res = await axios.get(`http://localhost:3000/api/customerphonecheck`, {
            const res = await axios.get(`https://pos-be-pham-5c635ce0026f.herokuapp.com/api/customerphonecheck`, {
              
            params: { phone: phoneNumber }
          });

          const data = res.data;

          if (data.found) {

            // Create new order in DB
        // const orderRes = await axios.post(`http://localhost:3000/api/orders/neworder-oldcustomer`, {
        const orderRes = await axios.post(`https://pos-be-pham-5c635ce0026f.herokuapp.com/api/orders/neworder-oldcustomer`, {
          phone: phoneNumber,      
          totalAmount: 0           
        });
        const newOrder = orderRes.data;

            navigate("/order-view", {
              state: {
                order: newOrder,
                name: data.name,
                phone: phoneNumber
              }
            });
          } else {
            console.log(phoneNumber);
            navigate("/enter-customer-name", {
              state: { phone: phoneNumber }
            });
          }
        } catch (error) {
          console.error("API error:", error);
        }

      }
  };

  // Update the validity of the Ok button based on phone number length
  const checkPhoneValidity = () => {
    setIsValid(phoneNumber.length === 10);
  };

  React.useEffect(() => {
    checkPhoneValidity();
  }, [phoneNumber]);

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
  };

  return (
    <div>
      <h2>Enter Phone Number</h2>
      <div>
        <div className="number-keyboard">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="number-button"
            >
              {num}
            </button>
          ))}
          <button onClick={() => handleNumberClick(0)} className="number-button">
            0
          </button>
        </div>
      </div>
      <div className="textphone">
        <input value={phoneNumber} readOnly />
        <button onClick={handleBackspace}
        className="back-space-button">Del</button>
      </div>
      <div>
        <button onClick={handleSkip} className="skip-button">
          Skip
        </button>
        <button
          onClick={handleOk}
          className="ok-button"
          disabled={!isValid}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default NumberKeyboardPage;
