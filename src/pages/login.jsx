import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './images/logo.jpg';
import './styles/loginpage.css';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] =useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        
        try {
        //   const response = await axios.post('http://localhost:3000/api/login', {
          const response = await axios.post('https://pos-be-pham-5c635ce0026f.herokuapp.com/api/login', {
            username,
            password
          });
          localStorage.setItem('token', response.data.token);
          navigate('/home'); 
        } catch (err) {
          alert('Login failed');
        }
    };

    return(
        
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <div className="imgcontainer">
                    <img 
                    src= {logo}
                    alt="Avatar"
                    />
                </div>
                    <div className="container">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input 
                        type="text" 
                        placeholder="Enter Username" 
                        name="uname" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    
                        <label htmlFor="psw"><b>Password</b></label>
                        <input 
                        type="password" 
                        placeholder="Enter Password" 
                        name="psw"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />

                    
                        <button type="submit" onClick={handleSubmit}>Login</button>
                    </div>

            </form>
        </div>
    );
    
}

export default Login