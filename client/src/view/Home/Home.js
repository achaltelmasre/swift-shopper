import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar"
import ProductCard from "../../component/ProductCard/ProductCard";
import axios from "axios";
import './Home.css';

function Home (){

    const [product, setProduct] = useState('');

    useEffect(() => {
        const storageUse = JSON.parse(localStorage.getItem("user") || '{}');
        setProduct(storageUse);
    }, [])

    // const product = async () => {

    //     const response = await axios.post("/products", {

           
    //     })

    return(
        <>
        <Navbar/>
        <div>
            <ProductCard />
        </div>
        <h2>Home</h2>
        </>
    )
}

export default Home