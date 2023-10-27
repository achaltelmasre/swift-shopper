import express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import Product from './models/Product.js';

const app = express();
app.use(express.json());

const MONGODB_URL = "";
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    if (conn) {
        console.log('MongoDB connected');
    }
};

//post /signup
app.post("/signup", async (req, res) => {
   const {
      name, 
      email, 
      password, 
      mobile,
      address, 
      gender
    } = req.body;

    const user = new User({
       name: name,
       email: email,
       password: password,
       mobile: mobile,
       address: address,
       gender:gender
    });

   try{
     const savedUser = await user.save();

     res.json({
         success: true,
         data: savedUser,
         message: " User created successfully "
     })
   }
   catch(e){
    res.json({
        success: false,
        message: e.message
    }) 
 }
});

//post /login
app.post("/login", async (req, res ) =>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "please provide email and password"
        })
    }

    const  user = await User.findOne({
        email: email,
        password: password
    }).select("name email mobile")
    
    if (user) {
        return res.json({
            success: true,
            data: user,
            message: "Login successful"
        });   
    }
    else{
        return res.json({
            success: false,
            message: "Invalid credentials"
        });
    }
});


//Get /Products
app.get("/products", async (req, res) => {
   const Products = await Product.find();

   res.json({
    success:true,
    data: Products,
    message: "Products fetched successfully"
   });
});

//Post /Product
app.post("/product", async (req, res) => {
    const {
        name,
        description,
        price,
        image,
        category,
        brand,
    } = req.body;

    const product = new Product({
        name:name,
        description: description,
        price: price,
        image: image,
        category: category,
        brand: brand,
    });

    try{
        const savedProduct = await product.save();

        res.json({
            success: true,
            data: savedProduct,
            message: "Product created successfully"
        });
    }
    catch(e)
    {
       res.json({
        success: false,
        message: e.message
       });
    }
});

//Get /Product/:id
app.get("/product/:id", async (req, res) => {
   const {id} = req.params;

   const product = await Product.findById(id);

   res.json({
    success: true,
    data: product,
    message: "Product fetched successfully"
   });
});

//Put /Product/:id
app.put("/product/:id", async (req, res) => {
  const {id} = req.params;

  const { name, description, price, image, category, brand, } = req.body;

    await Product.updateOne({_id: id}, {$set : {
     name: name,
     description: description,
     price: price,
     image: image,
     category: category,
     brand: brand,
  }});

  const updatedProduct = await Product.findById(id);

   res.json({
    success: true,
    data: updatedProduct,
    message: "Product update successfully"
   }); 
});

//Get /Product/Search?query
app.get("/products/search", async (req, res) => {
    const {q} = req.query;

    const products = await Product.find({name: {$regex: q, $options: "i"}});

    res.json({
        success: true,
        data: products,
        message: "Product fetched successfully"
    });
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
    connectDB();
});