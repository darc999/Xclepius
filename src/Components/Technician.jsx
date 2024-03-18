import '../App.css';
import axios from 'axios';
import Nav from './Nav';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
const Technician = () => {
    const [_id, setPid] = useState('');
    const [techname, setTechname] = useState('');
    const [field, setfield] = useState("");
    const [nic, setNic] = useState("");
    const [phonenum, setPhonenum] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Technicians, setTechnicians] = useState([]);

    
    

    const location = useLocation();
    const navigate = useNavigate();
  
    const [userId, setDocId] = useState(location.state?.userId || '');
  
    useEffect(() => {
     
      alert('Current Docid: ' + userId);
    }, [userId]);
    const handleLogout = () => {
      // Perform logout actions
      navigate('/homepage');
      setDocId('');
      alert('Logged out');
  };

  useEffect(() => {
    if (!userId) {
        navigate('/login'); // Redirect to login route if userId is not available
    }
}, [userId, navigate]);
    async function Load() {
        try {
       
          const result = await axios.get(`http://localhost:8089/api/v1/Technician/search/${userId}`);
          setTechnicians([result.data]); // Wrap the result in an array for consistency with map function
          console.log(result.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
      
      useEffect(() => {
        Load();
      }, [userId]);

    const logout = () => {
      
  
   
      navigate('/login');
    };
  


  return (
    
    <div>
        <Nav onLogout={handleLogout} />
        
        <h1 className='mb-5 text-center'>Technician Access</h1>
        <div  className="col-6" style={{ margin: '0px 150px' }}> 
        <p>YOUR DETAILS</p>
        </div>
        <div className="d-flex justify-content-center">
  <table className="table table-striped" style={{ width: '80%' }}>
  <thead>
    <tr>
      <th scope="col">Field</th>
      <th scope="col">Value</th>
    </tr>
  </thead>
  <tbody>
    {Technicians.map((Technician) => (
      Object.entries(Technician).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      ))
    ))}
  </tbody>
</table>


   
          </div>
          <section className="featured-product section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h2 className="mb-5">Why are you here?</h2>
                        </div>
                       

                        <div className="col-lg-4 col-12 mb-3">
                            <div className="product-thumb">
                                <a href="/testmanagement">
                                    <img src="images/product/7.jfif" className="img-fluid product-image" alt=""/>
                                </a>
                                <div className="product-top d-flex">
                                    <a href="#" className="bi-heart-fill product-icon ms-auto"></a>
                                </div>

                                <div className="product-info d-flex">
                                    <div>
                                        <h5 className="product-title mb-0 text-center">
                                            <a href="/testmanagement" className="product-title-link text-center">Appoinments</a>
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

export default Technician
