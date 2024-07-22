import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import ProductCard from "../../component/ProductCard/ProductCard";
import axios from "axios";
import './Home.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const searchProducts = async () => {
        if (search === '') {
            loadProduct();
            return;
        }

        try {
            const response = await axios.get(`/products/search?q=${search}`);
            if (response && response.data && response.data.data) {
                setProducts(response.data.data);
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error("Error searching products:", error);
            alert("Error searching products");
        }
    }

    useEffect(() => {
      searchProducts();
  }, [search, searchProducts]);

    const loadProduct = async () => {
        try {
            const response = await axios.get('/products');
            if (response && response.data && response.data.data) {
                setProducts(response.data.data);
            } else {
                throw new Error("Invalid response data");
            }
        } catch (error) {
            console.error("Error loading products:", error);
            alert("Error loading products");
        }
    };

    useEffect(() => {
        loadProduct();
    }, []);

    return (
        <>
            <div>
                <Navbar />

                <input type="text"
                    placeholder="Search"
                    className="search-bar"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }} />

                <div className="product-container">
                    {
                        products.map((product, index) => {
                            const { _id, name, description, price, image } = product;
                            return (
                                <ProductCard key={index}
                                    name={name}
                                    description={description}
                                    price={price}
                                    image={image}
                                    id={_id}
                                />
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Home;
