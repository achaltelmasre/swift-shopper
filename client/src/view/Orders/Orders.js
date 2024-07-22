import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Navbar/Navbar";
import OrderCard from "../../component/ProductCard/ProductCard";
import './Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response?.data?.data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
      alert("Error loading orders");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="order-container">
        {orders.map((order) => {
          const { _id, product, quantity, total, status } = order;
          return (
            <OrderCard
              key={_id}
              product={product}
              quantity={quantity}
              total={total}
              status={status}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
