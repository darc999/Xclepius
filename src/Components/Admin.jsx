import '../App.css';
import Nav from './Nav';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
const Admin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setPatientId] = useState(location.state?.userId || '');
    useEffect(() => {
      //alert('Current patientId: ' + userId);
    }, [userId]);
    const handleLogout = () => {
        // Perform logout actions
        navigate('/homepage');
        setPatientId('');
        alert('Logged out');
    };
    
    const send = () => {
        navigate("/Technicianmanagment", { state: { userId: userId } });
        //alert('ccscs patientId: ' + userId);
        
    };
    const send2 = () => {
        navigate("/appointmentmanagement", { state: { userId: userId } });
        //alert('ccscs patientId: ' + userId);
        
    };
    const send3= () => {
        navigate("/patientmanagement", { state: { userId: userId } });
        //alert('ccscs patientId: ' + userId);
        
    };
    const send4 = () => {
        navigate("/testman", { state: { userId: userId } });
        //alert('ccscs patientId: ' + userId);
        
    };
    useEffect(() => {
        if (!userId) {
            navigate('/login'); // Redirect to login route if userId is not available
        }
    }, [userId, navigate]);
  return (
    <div>
         <Nav onLogout={handleLogout} />
        {/* <button onClick={logout}>Logout</button> */}
          
              <section className="featured-product section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="mb-5">Why are you here?</h2>
                        </div>
                        <div className="col-lg-4 col-12 mb-3">
                            <div className="product-thumb">
                                <a href="/Technicianmanagment">
                                    <img src="images/product/6.jpg" className="img-fluid product-image" alt="" onClick={() => send(userId)}/>
                                </a>
                                <div className="product-top d-flex">   
                                    <a href="#" className="bi-heart-fill product-icon"></a>
                                </div>

                                <div className="product-info d-flex">
                                    <div>
                                        <h5 className="product-title mb-0 text-center">
                                            <a href="" className="product-title-link text-center">Technicians</a>
                                        </h5>  
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12 mb-3">
                            <div className="product-thumb">
                                <a href="/appointmentmanagement">
                                    <img src="images/product/7.jfif" className="img-fluid product-image" alt="" onClick={() => send2(userId)}/>
                                </a>
                                <div className="product-top d-flex">
                                    <a href="#" className="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div className="product-info d-flex">
                                    <div>
                                        <h5 className="product-title mb-0 text-center">
                                            <a href="" className="product-title-link text-center">Appoinments</a>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-12">
                            <div className="product-thumb">
                                <a href="/patientmanagement">
                                    <img src="images/product/8.jpg" className="img-fluid product-image" alt="" onClick={() => send3(userId)}/>
                                </a>

                                <div className="product-top d-flex">
                                    <a href="#" className="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div className="product-info d-flex">
                                    <div>
                                        <h5 className="product-title mb-0 text-center">
                                            <a href="/patientmanagement" className="product-title-link ">Patients</a>
                                        </h5>
                                    </div>  
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <div className="product-thumb">
                                <a href="/testman">
                                    <img src="images/product/8.jpg" className="img-fluid product-image" alt="" onClick={() => send4(userId)}/>
                                </a>

                                <div className="product-top d-flex">
                                    <a href="#" className="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div className="product-info d-flex">
                                    <div>
                                        <h5 className="product-title mb-0 text-center">
                                            <a href="product-detail.html" className="product-title-link ">Tests</a>
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

export default Admin
