import React from "react";
import "./ProductCard.css";

const ProductCard = ({ name, description, price, image }) => {
    return(
       <>
            <div className="product-card-container ">

                <img src={image} height={200} alt="img" className="product-img"/>
                <h2 className="product-name">{name}</h2>
                <p className="product-description">{description}</p>
                <h3 className="product-price"> ₹ {price} </h3>

                <button className="btn buy-now">Buy Now</button>

            </div>
       </>
    )
}
export default ProductCard;