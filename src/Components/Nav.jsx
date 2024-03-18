
import {useEffect, useLayoutEffect, useState } from "react";
import '../App.css';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { useLocation, useNavigate  } from 'react-router-dom';
const Nav = ({ onLogout }) => 
{
   

return (
    <div>
    <nav className="navbar navbar-expand-lg">
    <div className="container" >
       

        <a className="navbar-brand">
            <strong><span>XCLEPIUS</span> LABS</strong>
        </a>

        <div className="d-lg-none">
            <a href="sign-in.html" className="bi-person custom-icon me-3"></a>

            <a href="product-detail.html" className="bi-bag custom-icon"></a>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                    <a className="nav-link active" href="/homepage">Home</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" href="/patient">Register</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>
                <li className="nav-item">
                <button className="btn btn-warning" onClick={onLogout}> Logout</button>
                </li>
            </ul>

            <div className="d-none d-lg-block">
                <a href="sign-in.html" className="bi-person custom-icon me-3"></a>

                <a href="product-detail.html" className="bi-bag custom-icon"></a>
            </div>
        </div>
    </div>
</nav>
</div>
           );
}
  
  export default Nav;
