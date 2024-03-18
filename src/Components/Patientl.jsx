
import '../App.css';
import Nav from './Nav';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

// import { Helmet } from "react-helmet";

const Pateintl = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
  
    const [userId, setuserId] = useState(location.state?.userId || '');
  
    useEffect(() => {
      // Show an alert with the patientId when the component mounts or when it changes
     // alert('Current patientId: ' + userId);
    }, [userId]);
  
    const send = () => {
        navigate("/patientApo", { state: { userId: userId } });
        //alert('ccscs patientId: ' + userId);
        
    };
    const send2 = () => {
        navigate("/patreport", { state: { userId: userId } });
        //alert('ccscs patientId: ' + userId);
        
    };
   
    const handleLogout = () => {
        // Perform logout actions
        navigate('/homepage');
        setuserId('');
        alert('Logged out');
    };
  
    useEffect(() => {
        if (!userId) {
            navigate('/login'); // Redirect to login route if userId is not available
        }
    }, [userId, navigate]);
  return (
    
    <div>
       <Nav onLogout={handleLogout} />
        
      
        
        
            <section className="featured-product section-padding">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-12 text-center">
                            <h2 className="mb-5">Why are you here?</h2>
                        </div>

    

                        <div className="col-lg-6 col-12 mb-3  mx-auto text-center">
                            <div className="product-thumb">
                                <a href="/patientApo">
                                    <img src="images/product/7.jfif" className="img-fluid product-image" alt=""  onClick={() => send(userId)}/>
                                </a>

                                <div className="product-top d-flex">
                                    

                                    <a href="#" className="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div className="product-info d-flex flex-column">
                                    <div>
                                        <h5 className="product-title mb-0 text-center">
                                            <a href="" className="product-title-link text-center">Appoinments</a>
                                        </h5>

                                        
                                    </div>

                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-12  mx-auto text-center ">
                            <div className="product-thumb">
                                <a href="/patreport">
                                    <img src="images/product/8.jpg" className="img-fluid product-image" alt=""  onClick={() => send2(userId)}/>
                                </a>

                                <div className="product-top d-flex ">
                                    <a href="#" className="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div className="product-info d-flex flex-column">
                                    <div>
                                        <h5 className="product-title mb-0 text-center">
                                            <a href="" className="product-title-link ">Lab Reports</a>
                                        </h5>

                                       
                                    </div>

                                    
                                </div>
                            </div>
                        </div>

                       

                    </div>
                </div>
            </section>

            
            



       
    </div>
  )
}

export default Pateintl
