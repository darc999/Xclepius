
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

function  Footesr ()  {
    
   
  


  return (
    
    <div>
        <footer className="site-footer">
            <div className="container">
                <div className="row">

                    <div className="col-lg-3 col-10 me-auto mb-4">
                        <h4 className="text-white mb-3"><a href="index.html">XCLEPIUS</a> LABS</h4>
                        <p className="copyright-text text-muted mt-lg-5 mb-4 mb-lg-0">Copyright © 2024 <strong>XCLEPIUS LABS</strong></p>
                        <br/>
                        
                    </div>

                    <div className="col-lg-5 col-8">
                        <h5 className="text-white mb-3">Sitemap</h5>

                        <ul className="footer-menu d-flex flex-wrap">
                            <li className="footer-menu-item"><a href="about.html" className="footer-menu-link">Story</a></li>

                            <li className="footer-menu-item"><a href="#" className="footer-menu-link">Privacy policy</a></li>

                            <li className="footer-menu-item"><a href="#" className="footer-menu-link">FAQs</a></li>

                            <li className="footer-menu-item"><a href="#" className="footer-menu-link">Contact</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-4">
                        <h5 className="text-white mb-3">Social</h5>

                        <ul className="social-icon">

                            <li><a href="www,youtube.com" className="social-icon-link bi-youtube">Youtube</a></li>

                            <li><a href="www.whatsapp.com" className="social-icon-link bi-whatsapp">WhatsApp</a></li>

                            <li><a href="www.instergram.com" className="social-icon-link bi-instagram">Instergram</a></li>

                            <li><a href="www.skype.com" className="social-icon-link bi-skype">Skype</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    </div>
  )
}

export default Footesr
