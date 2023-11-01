import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar"
import ProductCard from "../../component/ProductCard/ProductCard";
import axios from "axios";
import './Home.css';

function Home (){

    const [products, setProducts] = useState([]);

    const  loadProduct = async () =>{
     
      try{
        const response = await axios.get('/products');
        setProducts(response?.data?.data);
      } 
      catch(err){
        console.log(alert);
        alert("Error loading products")
      }
    };

    useEffect(() => {
     loadProduct();
    }, [])

    return(
        <>
        <div>
        <Navbar/>
        <div className="product-container">
            { 
             products?.map(( product, index) => {
             const {name, description, price, image} = product;
                return(
                    <ProductCard key={index}
                      name={name}
                      description={description}
                      price={price}
                      image={image}
                      
                    />
                )

           })
                
            }
          
        </div>
        </div>
        </>
    )
}

export default Home