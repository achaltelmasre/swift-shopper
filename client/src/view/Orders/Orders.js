import React, { useEffect, useState } from  'react'
import "./Orders.css";
import Navbar from '../../component/Navbar/Navbar';

function Orders () {

    const [user, setUser] = useState({});

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
            <h1>Orders</h1>
          </div> 
    )
}

export default Orders