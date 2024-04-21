import './signin.css';
import React, { useEffect, useState } from'react';

import axios from 'axios';
import { Link,Navigate } from 'react-router-dom';
const Signin = ({handleLogin})=>{

    const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
      const [msg, setMsg]=useState("");
      const [isLoggedIn, setIsLoggedIn] = useState(false);
       
      const handleSubmit = async (event) => {
        event.preventDefault();
        
      const response = await  axios({
            method: 'post',
            url: 'http://localhost:9090/signin',
            data: formData
          })
          if (response.data.token) {
            localStorage.setItem('token', response.data.token); // Store the token in localStorage
            setMsg('');
            setIsLoggedIn(true); // Update login state
            
          } 
          setMsg(response.data.message)
          console.log(response);
          
      };
    
      // Function to handle input changes
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
 
      
      if(isLoggedIn){
        setTimeout(() => {
          window.location.reload();
        }, 100);
       
        return <Navigate to="/dashboard" replace={true}/>
      }
    
      
    return (
        <div className='loginContainer'>
       
           <form onSubmit={handleSubmit}>
           <h2>Signin</h2>
          <p>Welcome, login to continue</p>
            <div>
            <input type="email" name="email" placeholder='enter your email address'
          value={formData.email}
          onChange={handleChange} />
            <input type="password"  name="password" placeholder='enter your password'
          value={formData.password}
          onChange={handleChange}/>
            </div>
            <button>Sign in</button>
            <div className='msg'>{msg}</div>
            <p>Don't have an account?<Link to="/register" className='lbtn'>Sign up</Link></p>
           </form> 
        </div>
    )
}

export default Signin;