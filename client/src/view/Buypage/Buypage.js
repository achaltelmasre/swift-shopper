import React, {useEffect, useState} from "react";
import './Buypage.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";

function Buypage () {

  const {id} = useParams()

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [shippingAddress, setShippingAddress] = useState('');

   const loadProduct = async () =>{
     if (!id) {
         return;
     }

     const response = await axios.get(`/product/${id}`);
     setProduct(response?.data?.data);
   };

   const increaseQuantity = () => {
     setQuantity(quantity + 1);
   }

   const decreaseQuantity = () => {
      
     if (quantity === 1) {
          return;
     }
     setQuantity(quantity - 1);
   }

   useEffect (() =>{
      loadProduct();
   }, []);

    return(
      <div>
        <Navbar />

        <div className="buy-product-info">

          <div >
          <img src={product.image} alt={product.image} className="product-image"/>
          </div>

          <div className="product-info">
             <h2>{product.name}</h2>
              <p>{product.description}</p>
              <h3>₹ {product.price}</h3>

              <div>
             <span className="btn-decrease-quantity" onClick={decreaseQuantity}>➖</span>
             <span className="product-quantity-text">{quantity}</span>  
             <span className="btn-increase-quantity" onClick={increaseQuantity}>➕</span>

          </div>

          <input type="text"
           placeholder="Enter Shipping Address " className="input-shipping-Address"
           value={shippingAddress}
           onChange={(e) =>{
            setShippingAddress(e.target.value)
           }}
           />

          </div>

         
        </div>
       
      </div>

    )
}

export default Buypage;