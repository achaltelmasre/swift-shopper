import React, { useState } from "react";
import axios from 'axios';
import './Signup.css';

function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');    const [mobile, setMobile] = useState('');
    const {address, setAddress} = useState('');
    const {gender, setGender} = useState('');

    
    const signup = async () => {

        if (!name || !email || !password || !mobile || !address || !gender) 
        {
           alert('Please enter all fields')
           return 
        }
     
        const response = await axios.post(
            {
                name:name,
                email:email,
                password:password,
                mobile:mobile,
                address:address,
                gender:gender

            }
        )

    }
  
    
    return(
      <div>
           <h2> Signup</h2>

           <div>
            <lable htmlFor='name'>Name:</lable>
            <input type='text' placeholder="Enter your name" id='name' value={name}
            />
           </div>

           <div>
            <lable htmlFor='email'>Email:</lable>
            <input type='email' placeholder="Enter your email" id='email' value={email}/>
           </div>

           <div>
            <lable htmlFor='password'>Password:</lable>
            <input type='password' placeholder="Enter your password" id='password' value={password}/>
           </div>

           <div>
            <lable htmlFor='mobile'>MobileNo.:</lable>
            <input type='text' placeholder="Enter your mobile number" id='mobile' value={mobile}/>
           </div>

           <div>
            <lable htmlFor='address'>Address:</lable>
            <input type='text' placeholder="Enter your address" id='address' value={address}/>
           </div>
      </div>
     
    
        )
}

export default Signup