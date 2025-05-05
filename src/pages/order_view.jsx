import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/order_view.css';



const OrderView = () => {
  const[items, setItem] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get data
  const orderData = location.state;
  console.log(orderData);
  const phone = orderData.order.customer_phone;
  const order_id = orderData.order.id;
  const order_items = orderData.order.items;
  console.log(order_items);


  

  useEffect(() => {
    handleMenu();
    handleStaffs();
    handleCartItem();
  }, [order_items]);

// Reload items to cart item if it's already
const handleCartItem = () =>{
  if (order_items && order_items.length > 0) {
    const preloadedItems = order_items.map(item => ({
      name: item.product_name,
      quantity: item.quantity,
      price: parseFloat(item.unit_price).toFixed(2)
    }));
    setCartItems(preloadedItems);
  }
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
// Get menu
  const handleMenu = async() =>{
    try{
      const menuRes = await axios.get('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/products');
      setItem(menuRes.data);
    }catch (err) {
      console.error('Failed to fetch orders:', err);
      alert("Session expired or unauthorized. Please log in again.");
      localStorage.removeItem('token');
  }
};


// Add item menu to cart
const addToCart = (item) => {
  setCartItems((prev) => {
    const existing = prev.find((p) => p.name === item.name);
    if (existing) {
      return prev.map((p) =>
        p.name === item.name ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
    return [...prev, { name: item.name, quantity: 1, price: item.price }];
  });
};

  const handleCheckOut = async() => {
      // const selectedStaff = document.getElementById('staff').value;
      // console.log(selectedStaff);
    
      if (!selectedStaff || cartItems.length === 0) {
        alert('Please select a staff and add items to the cart.');
        return;
      }

      setLoading(true);
    
      const payload = {
        staffId: selectedStaff,
        orderId: order_id,
        total: parseFloat(calculateTotal()),
        items: cartItems.map(item => {
          const product = items.find(p => p.name === item.name);
          return {
            productId: product.id,
            quantity: item.quantity,
            unit_price : item.price
          };
        })
      };
      
    
      try {
        await axios.post('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/checkoutButton', payload);
        // console.log(payload);
        setCartItems([]); // clear cart
        navigate('/checkout-successfull');
      } catch (error) {
        console.error('Checkout failed:', error);
        alert(error.response?.data?.error || 'Checkout failed.');
      }finally {
        setLoading(false);
      }

      console.log(payload);
  };

  // Calculate total cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Handle to select Staffs
  const handleStaffs = async() =>{
    try{
      const staffRes = await axios.get('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/staffs');
      setStaffs(staffRes.data);
    }catch (err){
      console.error('Failed to fetch orders:', err);
      alert("Session expired or unauthorized. Please log in again.");
    }
  };

  // Handle  when click Backhome button
  const handleBackbutton = async() =>{
    if (cartItems.length === 0) {
      navigate('/home');
      return;
    }

    const payload = {
      orderId: order_id,
      items: cartItems.map(item => {
        const product = items.find(p => p.name === item.name);
        return {
          productId: product.id,
          quantity: item.quantity,
          unit_price : parseInt(item.price)
        };
      })
    };

    try{
      await axios.post('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/orderItems', payload);
      navigate('/home');
    }catch (err){
      console.error('Failed to fetch orders:', err);
      alert("Session expired or unauthorized. Please log in again.");
     
    }

    console.log(payload);
  };

  return (
    <div className="order-view">
      <div className="header">
        <h2>Order View</h2><br />
      </div>
      <div className='row-2'> 
        <div className="staff">
          <label>Staff: </label>
          <select id="staff" value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}>
            <option value="">-- Select Staff --</option>
              {staffs.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
            ))}
          </select>
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
     <div className="menuitem">
        <h3>Menu</h3>

        <div className="menu_list">
          {items.map((item) => (
            <div key={item.id} className="menu-box">
              <button onClick={() => addToCart(item)}>{item.name}</button><br />
            </div>
          ))}
        </div>
      </div>
      

      {/* Cart View */}
      <div className="cart">
        <h3>Cart</h3>
        <ul>
        {groupCartItems(cartItems).map((item, index) => (
            <li key={index.name}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <p><strong>Total: ${calculateTotal()}</strong></p>

        {/* Check-out Button */}
        <div className='checkout-session'>
          <div className='backButton'>
            <button onClick={handleBackbutton}>Back home</button>
          </div>

          {/* Check out button */}
          <div className="checkout-btn">
          <button onClick={handleCheckOut} disabled={loading}>
            Check-Out
          </button>
          </div>
        </div>
       

      </div>
     </div>
     
      

    </div>
  );
};

export default OrderView;
