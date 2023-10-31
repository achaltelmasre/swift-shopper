import React, { useState } from "react";

import './Login.css';
import axios from "axios";
import { Link } from "react-router-dom";

function Login (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {

        const response = await axios.post("/login", {

            email:email,
            password:password
        })

        
        alert(response?.data?.message);

        if (response?.data?.success) {
            alert(response?.data?.message);
            window.location.href = "/home";
        }

    }
 
    return(
        <div className="login">
            <form className="main-container">
                <h1>Login</h1>

                <div>
            <lable htmlFor='email'>Email:</lable>
            <input type='email' 
              placeholder="Enter your email" 
              id='email' value={email}
              className="input-form"
              onChange={(e) => {setEmail(e.target.value)}}/>
           </div>

           <div>
            <lable htmlFor='password'>Password:</lable>
            <input type='password' 
              placeholder="Enter your password" 
              id='password' value={password}
              className="input-form"
              onChange={(e) => {setPassword(e.target.value)}}/>
           </div>

           <button type="button" className="btn login-btn"
              onClick={login}
           > Login </button>

           <Link to="../signup">Create new Account</Link>

            </form>

        </div>
    )
}

export default Login