
import '../App.css';
import axios from 'axios';
import Nav from './Nav';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cars from './Cars';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import Footer from './Footer';

// import { Helmet } from "react-helmet";

const Contacts = () => {
    
    
  


  return (
    
    <div>
        <Nav/>
        <Cars/>
       

            



       <Footer/>
    </div>
  )
}

export default Contacts
