import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../App.css';
import Slider from "react-slick";
function Cars(){
    const settings={
    autoplay: true,
    infinite: true,
    arrows: false,
    fade: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    
    };
return(
<div>
    
<section className="slick-slideshow">   
<Slider {...settings}>
                <div className="slick-custom">
                    <img src="./images/slideshow/1.jfif" className="img-fluid" alt=""/>

                    <div className="slick-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-10">
                                    <h1 className="slick-title">XCLEPIUS LABS</h1>

                                    <p className="lead text-white mt-lg-3 mb-lg-5">Precision in Every Test, Excellence in Every Result: Your Health, Our Priority!.</p>

                                    <a href="about.html" className="btn custom-btn">JOIN US</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slick-custom">
                    <img src="./images/slideshow/2.jfif" className="img-fluid" alt=""/>

                    <div className="slick-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-10">
                                    <h1 className="slick-title">Best Technicians</h1>

                                    <p className="lead text-white mt-lg-3 mb-lg-5">Precision Diagnostics, Personalized Care: Transforming Lives, One Test at a Time.</p>

                                    <a href="product.html" className="btn custom-btn">Meet Our Technicians</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="slick-custom">
                    <img src="./images/slideshow/3.jfif" className="img-fluid" alt=""/>

                    <div className="slick-bottom">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-10">
                                    <h1 className="slick-title">Best Service</h1>

                                    <p className="lead text-white mt-lg-3 mb-lg-5">Where Science Meets Care: Pioneering Medical Lab Services for a Healthier Tomorrow.</p>

                                    <a href="contact.html" className="btn custom-btn">Services</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Slider>
            </section>
            
</div>
)
    
}
export default Cars;