import React, { useEffect, useState } from  'react'
import "./Orders.css";
import Navbar from '../../component/Navbar/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const STATUS_BADGE_COLOR_MAP = {
   "pending": "badge-denger",
   "shipped": "badge-warning",
   "delivered": "badege-success"
}

function MyOrders () {

    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([])

     const loadOrders = async () => {
      const storageUse = JSON.parse(localStorage.getItem("user") || '{}');


      const userId =storageUse._id;

      if (!userId) {
          return;
      }

        const response = await axios.get(`/orders/user/${userId}`);
        setOrders(response?.data?.data);
        console.log();
     } 

    useEffect(() => {
       loadOrders();
    }, [user]);

    useEffect(() =>{
        const storageUser = JSON.parse(localStorage.getItem("user") || '{}');
         if (storageUser?.email) {
            setUser(storageUser);
         }
         else{
            alert("You are not logged in!");
            window.location.href = "/login";
         }
    }, [])

    return (
          <div>
            <Navbar />
            <h1 className='text-center'>My Orders</h1>
            <div className="orders-container">
               {
                  orders?.map((order, index) =>{
                     const {product, quantity, status, deliveryCharges} = order;

                     return (
                      <div className="order-card">
                        <Link to={`/buy/${product._id}`}> {product.name} </Link>
                        <h4>₹ {product.price} * {quantity} = ₹ {product.price* quantity}</h4>
                        
                        <span className={`order-status ${STATUS_BADGE_COLOR_MAP [status]}`}>
                           {status}</span>

                        </div>
                     )
                  })
               }
            </div>
          </div> 
    )
}

export default MyOrders