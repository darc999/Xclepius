
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

const Homepage = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
  
    const [userId, setuserId] = useState(location.state?.userId || '');
  
    useEffect(() => {
    
      //alert('Current patientId: ' + userId);
    }, [userId]);
  
    const handleLogout = () => {
        // Perform logout actions
        navigate('/homepage');
        setuserId('');
    };
  


  return (
    
    <div>
        <Nav onLogout={handleLogout} />
        <Cars/>
      
            <section className="about section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-12 text-center">
                            <h2 className="mb-5">Get started with <span>Tests</span></h2>
                        </div>

                        <div className="col-lg-2 col-12 mt-auto mb-auto">
                            <ul className="nav nav-pills mb-5 mx-auto justify-content-center align-items-center" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Why Tests</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-youtube-tab" data-bs-toggle="pill" data-bs-target="#pills-youtube" type="button" role="tab" aria-controls="pills-youtube" aria-selected="true">Precautions </button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-skill-tab" data-bs-toggle="pill" data-bs-target="#pills-skill" type="button" role="tab" aria-controls="pills-skill" aria-selected="false">Good Habbits</button>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-10 col-12">
                            <div className="tab-content mt-2" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                    <div className="row">
                                        <div className="col-lg-7 col-12">
                                            <img src="images/4.jfif" className="img-fluid" alt=""/>
                                        </div>

                                        <div className="col-lg-5 col-12">
                                            <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                                                <h4 className="mb-3">Tests <span>Are</span> <br/>Important for <span>your</span> Health</h4>

                                                <p>Medical tests play a vital role in your well-being journey. They're like health detectives, helping us understand your body's story. From routine check-ups to special diagnostics,</p>
                                            
                                                <p>Embrace regular testing as a proactive step towards understanding and nurturing your unique health needs..</p>

                

                                                <div className="mt-2 mt-lg-auto">
                                                    <a href="" className="custom-link mb-2">
                                                        Learn more about us
                                                        <i className="bi-arrow-right ms-2"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="pills-youtube" role="tabpanel" aria-labelledby="pills-youtube-tab">

                                    <div className="row">
                                        <div className="col-lg-7 col-12">
                                            <div className="ratio ratio-16x9">
                                                <iframe width="560" height="315" src="https://www.youtube.com/embed/f8_3IM139-o?si=iXn3JhucrEbDX2Hb" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                            </div>
                                        </div>

                                        <div className="col-lg-5 col-12">
                                            <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                                                <h4 className="mb-3">We will guide you</h4>

                                                <p>Get ready for your medical test journey! Just follow the simple steps your Technician suggests before the test – it's like a tailored roadmap to accurate results. Together, let's make your health story clear and your path to well-being even smoother.</p>

                                                <div className="mt-2 mt-lg-auto">
                                                    <a href="" className="custom-link mb-2">
                                                        Work with us
                                                        <i className="bi-arrow-right ms-2"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="pills-skill" role="tabpanel" aria-labelledby="pills-skill-tab">
                                    <div className="row">
                                        <div className="col-lg-7 col-12">
                                            <img src="images/cody-lannom-G95AReIh_Ko-unsplash.jpeg" className="img-fluid" alt=""/>
                                        </div>

                                        <div className="col-lg-5 col-12">
                                            <div className="d-flex flex-column h-100 ms-lg-4 mt-lg-0 mt-5">
                                                <h4 className="mb-3">What can help you?</h4>

                                                <p>Embrace a culture of proactive healthcare with regular medical tests. Cultivate the habit of scheduling routine check-ups, adhering to recommended screenings, and following pre-test instructions. These simple habits empower you to detect and address potential health issues early, ensuring a proactive and preventive approach to your overall well-being</p>

                                
                                                
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>


            

            <section className="front-product section-padding">
                <div className="container-fluid p-0">
                    <div className="row align-items-center">

                        <div className="col-lg-6 col-12 text-center">
                            <img src="images/5.jpg" className="img-fluid mx-auto d-block" alt=""/>
                        </div>

                        <div className="col-lg-6 col-12">
                            <div className="px-5 py-5 py-lg-0">
                                
                                <h2 className="mb-4"><span>Why</span> XCLEPIUS?</h2>

                                <p className="lead mb-4">our commitment to health draws inspiration from Asclepius, the ancient Greek god of healing. Just as Asclepius symbolized wellness and medicine, our lab is dedicated to fostering a healing environment through advanced diagnostics and compassionate care. Join us on a journey where cutting-edge technology meets ancient wisdom, ensuring that your well-being is at the heart of our mission..</p>

                        
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            



       <Footer/>
    </div>
  )
}

export default Homepage
