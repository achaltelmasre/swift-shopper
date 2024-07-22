import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import User from './models/User.js';
import Product from './models/Product.js';
import Order from "./models/Order.js";  // Ensure the correct path and name

const app = express();
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);  // Exit process with failure
    }
};

// Connect to the database
connectDB();

// POST /signup
app.post("/signup", async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;

    const user = new User({
        name,
        email,
        password,
        mobile,
        address,
        gender
    });

    try {
        const savedUser = await user.save();
        res.json({
            success: true,
            data: savedUser,
            message: "User created successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// POST /login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide email and password"
        });
    }

    try {
        const user = await User.findOne({ email, password }).select("name email mobile");
        if (user) {
            res.json({
                success: true,
                data: user,
                message: "Login successful"
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// GET /products
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            success: true,
            data: products,
            message: "Products fetched successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// POST /product
app.post("/product", async (req, res) => {
    const { name, description, price, image, category, brand } = req.body;

    const product = new Product({
        name,
        description,
        price,
        image,
        category,
        brand
    });

    try {
        const savedProduct = await product.save();
        res.json({
            success: true,
            data: savedProduct,
            message: "Product created successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// GET /product/:id
app.get("/product/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        res.json({
            success: true,
            data: product,
            message: "Product fetched successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// PUT /product/:id
app.put("/product/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category, brand } = req.body;

    try {
        await Product.updateOne({ _id: id }, { $set: { name, description, price, image, category, brand } });
        const updatedProduct = await Product.findById(id);
        res.json({
            success: true,
            data: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// GET /products/search
app.get("/products/search", async (req, res) => {
    const { q } = req.query;

    try {
        const products = await Product.find({ name: { $regex: q, $options: "i" } });
        res.json({
            success: true,
            data: products,
            message: "Products fetched successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// POST /order
app.post("/order", async (req, res) => {
    const { user, product, quantity, shippingAddress, deliveryCharges } = req.body;

    const order = new Order({
        user,
        product,
        quantity,
        shippingAddress,
        deliveryCharges
    });

    try {
        const savedOrder = await order.save();
        res.json({
            success: true,
            data: savedOrder,
            message: "Order created successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// GET /order/:id
app.get("/order/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate("user product");
        order.user.password = undefined; // Hide sensitive info
        res.json({
            success: true,
            data: order,
            message: "Order fetched successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// GET /orders/user/:id
app.get("/orders/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const orders = await Order.find({ user: id }).populate('product user');
        res.json({
            success: true,
            data: orders,
            message: "Orders fetched successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// PATCH /order/status/:id
app.patch("/order/status/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const STATUS_PRIORITY_MAP = {
        pending: 0,
        shipped: 1,
        delivered: 2,
        returned: 3,
        cancelled: 4,
        rejected: 5
    };

    try {
        const order = await Order.findById(id);
        const currentPriority = STATUS_PRIORITY_MAP[order.status];
        const newPriority = STATUS_PRIORITY_MAP[status];

        if (currentPriority > newPriority) {
            return res.status(400).json({
                success: false,
                message: `${status} cannot be set once order is ${order.status}`
            });
        }

        await Order.updateOne({ _id: id }, { $set: { status } });
        const updatedOrder = await Order.findById(id);
        res.json({
            success: true,
            data: updatedOrder,
            message: "Order status updated successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

// GET /orders
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find();
        res.json({
            success: true,
            data: orders,
            message: "Orders fetched successfully"
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
