import React, {useEffect, useState} from "react";
import './Buypage.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";

function Buypage () {

  const {id} = useParams()

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [deliveryCharges, setDeliveryCharges] = useState('50');
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

   const placeholder = async () =>{

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    const orderDetails = {
      user: currentUser._id,
      product: id,
      quantity: quantity,
      shippingAddress: shippingAddress,
      deliveryCharges:deliveryCharges,
    } 

    const response = await axios.post('/order', orderDetails);
    alert(response?.data?.message);

    if (response?.data?.success) {
       window.location.href = '/orders';
    }
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
             <h1 className="buy-product-name">{product.name}</h1>
              <p className="buy-product-description">{product.description}</p>
              <h3 className="buy-product-price">₹ {product.price}</h3>

              <div>
             <span className="btn-decrease-quantity" onClick={decreaseQuantity}>➖</span>
             <span className="product-quantity-text">{quantity}</span>  
             <span className="btn-increase-quantity" onClick={increaseQuantity}>➕</span>
     
            <span className="product-quantity">Quantity : <span className="quantity">{quantity}</span></span>
             

          </div>

          <div className="delivery-charge">
          <input type="radio"
                 name="delivery"
                  id="regular" 
                  className="delivery" 
                  checked={deliveryCharges === "50"} 
                  onClick={(e) => { setDeliveryCharges("50")}}/>
            <label htmlFor="regular">Regular </label>

            <input type="radio"
                 name="delivery"
                  id="faster" 
                  className="delivery" 
                  checked={deliveryCharges === "100"} 
                  onClick={(e) => { setDeliveryCharges("100")}}/>
            <label htmlFor="faster">Faster </label>
          </div>
          <h3>Delivery Charges : {deliveryCharges}</h3>
         
         {/* <p>Total : {total} </p> */} 
    

          <input type="text"
           placeholder="Enter Shipping Address " className="input-shipping-Address"
           value={shippingAddress}
           onChange={(e) =>{
            setShippingAddress(e.target.value)
           }}
           />
          </div>   

        </div>
     
        <button type="button"
         className="btn-place-order" 
         onClick={placeholder}>
              Place Order
          </button>
       
      </div>

    )
}

export default Buypage;