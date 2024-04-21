import './dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Dashboard = ()=>{
    const [getdata, setData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
        const formatDate = (dateString) => {
          const dateObject = new Date(dateString);
          const day = dateObject.getDate().toString().padStart(2, '0');
          const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
          const year = dateObject.getFullYear();
          return `${day}-${month}-${year}`;
        };

        function check(date){
            if(date==null){
                return "----"
            }else{
                return formatDate(date);
            }
        }
        

    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:9090/getdata');
          console.log(response.data);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error); 
        }
      };
      
      useEffect(() => {
        setIsLoggedIn(true)
        fetchData();

    }, [isLoggedIn]);
      
      const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:9090/remove/${userId}`);

            if (response.status === 200) {
                console.log('User deleted successfully');
               
                
            } else {
                console.error('Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error deleting user:', error.message);
        }
        fetchData();
    };
     
    return(
        <div className='dashboardContainer'>
           <div className='dashboard'>
           <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Received/Quantity</th>
              <th>Date Dispatched/Quantity</th>
              <th>Pending Items</th>
              <th>Status</th>
              <th>QR code (Click to download)</th>
              <th>Admin Panel</th>
            </tr>
          </thead>
          <tbody>
            {getdata.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{formatDate(item.dateReceived)}/{item.ReceivedQty}</td>
                <td>{check(item.dateDispatched)}{item.DispatchedQty>0?'/'+item.DispatchedQty:''}</td>
                <td>{Math.abs(item.DispatchedQty-item.ReceivedQty)}</td>
                <td>{item.DispatchedQty>0?"Delivered":item.status}</td>
                <td>
                  <a href={item.qrCode} download={item.qrCode}>
                    <img src={item.qrCode} height={100} width={100} alt='QR Code' />
                  </a>
                </td>
                <td>
                  <span><Link to={`/edit/${item._id}`}><img src='icons/edit.png' height={20} width={20} alt='Edit' /></Link></span>
                  <span> <button  onClick={() => deleteUser(item._id)} 
                  className='deletebtn'><img src='icons/delete.png' alt='Delete' height={20} width={20} /></button></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
           </div>
        </div>
    )
    
}
export default Dashboard;