import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar"
import ProductCard from "../../component/ProductCard/ProductCard";
import axios from "axios";
import './Home.css';

function Home (){

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const searchProducts = async () => {
       if (search === '') {
        loadProduct();
        return;
       }

       const response = await axios.get(`/products/search?q=${search}`);
         setProducts(response?.data?.data);
    }

     useEffect (() =>{
      searchProducts();
    }, [search]);

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

        <input type="text" 
          placeholder="Search" 
          className="search-bar"
           value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}/>

        <div className="product-container">
            { 
             products?.map(( product, index) => {
             const {_id, name, description, price, image} = product;
                return(
                    <ProductCard key={index}
                      name={name}
                      description={description}
                      price={price}
                      image={image}
                      id={_id}
                        
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