import React, { useState, useEffect } from "react";
import {useLocation,useNavigate } from "react-router-dom";
import './styles/checkout-successfull.css';

const CheckoutSuccessfull = ()=>{
    const navigate = useNavigate();

    const hanldeButton = () =>{
        navigate('/home');
    }

    return(
        <div>
            <h4>YOUR ORDER HAS BEEN PLACED SUCCESSFULLY!!!!!</h4>
            <button onClick={hanldeButton}>
                Back home
            </button>
        </div>
    );
};

export default CheckoutSuccessfull;