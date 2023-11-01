import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ image,name, description, price }) => {
    return(
       <>
            <div className="product-card">
                <img src={image} height={100} alt="img" />
                <h2 className="product-name">{name}</h2>
                <p className="product-description">{description}</p>
                <h3> {price} </h3>
            </div>
       </>
    )
}
export default ProductCard;