import { useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navigate } from "react-router-dom";

const Register =()=>{
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
      });

      const [isRegistered, setIsRegistered] = useState(false);
       
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        axios({
            method: 'post',
            url: 'http://localhost:9090/register',
            data: formData
          });
      
          setIsRegistered(true);

        // setFormData({
        //     username: '',
        //     email: '',
        //     password: ''
        //   });
      };
      if (isRegistered) {
        return <Navigate to="/signin" replace={true} />
      }
    
      // Function to handle input changes
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    return(
       <div className="registerContainer">
         
         <form className="container" onSubmit={handleSubmit}>
         <h2>Register</h2>
         <p>Create Your Free Account Now?</p>
           <div className='input'>
           <input type="text"  name="name" placeholder='enter name'
          value={formData.name}
          onChange={handleChange} />
            <input type="email" name="email" placeholder='enter email'
          value={formData.email}
          onChange={handleChange} />
            <input type="password"  name="password" placeholder='enter password'
          value={formData.password}
          onChange={handleChange}/>
            
           </div>
           <button>Register</button>
            
             <p>Already have an account? <Link to="/signin" className='lbtn'> Login Here</Link></p>
         </form>
       </div>
    )
}

export default Register;