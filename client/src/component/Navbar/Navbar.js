import React, { useEffect, useState } from "react";
import logo from './img/logo.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar () {

    const [user, setUser] = useState({});

    useEffect(() => {
        const storageUse = JSON.parse(localStorage.getItem("user") || '{}');
        setUser(storageUse);
    }, [])

    return(
        <>  
             <div className="navbar">
                  <span>
                      <Link to="/"><img src={logo} height={50}/> </Link>
                  </span>

                  <div className="navbar-link-container">
                  <Link to="/" className="navbar-link">
                        Home
                    </Link>

                    <Link to="/login" className="navbar-link">
                        Login
                    </Link>

                    <Link to="/signup" className="navbar-link">
                        Signup
                    </Link>

                    <Link to="/orders" className="navbar-link">
                        Orders
                    </Link>
                    
                  </div>

                  <div className="hello-user">
                        Hello , <span className="user">  {user.name || 'User!'}</span>
                       
                       {
                        user?.name ? 
                         (<span className="navbar-logout" onClick={() =>{
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}>
                            Logout
                        </span>
                        ) : null
                       }
                    </div>
             </div>
        </>
    )
}

export default Navbar