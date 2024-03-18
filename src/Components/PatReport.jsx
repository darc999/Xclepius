
import '../App.css';
import Nav from './Nav';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cars from './Cars';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

// import { Helmet } from "react-helmet";

const PatReport = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setPatientId] = useState(location.state?.userId || '');
  
    useEffect(() => {
     // alert('Current patientId: ' + userId);
    }, [userId]);
    const handleLogout = () => {
      // Perform logout actions
      navigate('/homepage');
      setPatientId('');
      alert('Logged out');
  };
  useEffect(() => {
    if (!userId) {
        navigate('/login'); // Redirect to login route if userId is not available
    }
}, [userId, navigate]);
    const handleDownload = async () => {
        setLoading(true);
        try {
         
          const response = await axios.get(`http://localhost:8089/api/v1/Report/getAll`, {
            responseType: 'json' // Set responseType to 'json' to receive JSON data
          });
      
          
          const matchingItems = response.data.filter(item => item.patientID === userId);
      
          if (matchingItems.length === 0) {
            setError('No matching data found for the user');
            return;
          }
      
          matchingItems.forEach((item, index) => {
            const jsonData = JSON.stringify(item);
            const blob = new Blob([jsonData], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = setTimeout; 
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          });
        } catch (error) {
          setError(error.message || 'An error occurred while downloading the files');
        }
        setLoading(false);
      };
    

  return (
    
    <div>
       <Nav onLogout={handleLogout} />
        <div className="col-12 text-center">
        <h2 className="mb-5">Download Tests</h2>
        </div>
        
       <button className="btn btn-warning" onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download File'}
      </button>
      {error && <p>{error}</p>}

            



       
    </div>
  )
}

export default PatReport
