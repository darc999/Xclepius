import axios from 'axios';
import '../App.css';
import Nav from './Nav';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';

const PatientApo = () => {

    useEffect(() => {
      (async () => await Load())();
      }, []);
    const [_id, setPid] = useState('');
    const [isbooked, setisbooked] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [patients, setpatients] = useState([]);
    const [paymentStatus, setpaymentStatus] = useState("");
    const [apoinmenttime, setapoinmenttime] = useState("");
    const [appointmentDate, setappointmentDate] = useState("");
    const [Appoinments, setAppoinments] = useState([]);
    const [tests, setTests] = useState([]);
    const [testname, settestname] = useState("");
    const [price, setprice] = useState("0");
    const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
    const [selectedTestId, setSelectedTestId] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isButtonDisabled2, setIsButtonDisabled2] = useState(false);
    const [userAppointments, setUserAppointments] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();
    const [userId, setPatientId] = useState(location.state?.userId || '');
  
    useEffect(() => {
     // alert('Current patientId: ' + userId);
    }, [userId]);


    useEffect(() => {
   
      LoadTests();
      fetchUserAppointments();
    }, []);
    const handleLogout = () => {

      navigate('/homepage');
      setPatientId('');
      alert('Logged out');
  };
  useEffect(() => {
    if (!userId) {
        navigate('/login'); 
    }
}, [userId, navigate]);

    const fetchUserAppointments = async () => {
      try {
        const result = await axios.get(`http://localhost:8089/api/v1/Appoinment/getAll`);
        const userAppointments = result.data.filter(appointment => appointment.patientId === userId);
        setUserAppointments(userAppointments);
      } catch (error) {
        console.error('Error fetching user appointments:', error);
      }
    };
 
async function LoadTests() {
    try {
     
      const result = await axios.get("http://localhost:8089/api/v1/Test/getAll");
      setTests(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching test data:', error);
    }
  }

    async function Load() {
  try {
    const result = await axios.get("http://localhost:8089/api/v1/Appoinment/getAll");
    // Filter appointments with paymentStatus as false
    const unpaidAppointments = result.data.filter(appointment => !appointment.paymentStatus);
    setAppoinments(unpaidAppointments);
    console.log(unpaidAppointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
  }
}
     async function DeleteAppoinments(pid)
     {
          await axios.delete("http://localhost:8089/api/v1/Appoinment/delete/" + pid); 
          alert("You have Deleted the Appoinment");
          Load();
     }
  
    
    const handleAddAppointment = (appointmentId) => {
      setSelectedAppointmentId(appointmentId);
      const selectedAppointment = Appoinments.find(appointment => appointment._id === appointmentId);
    const appointmentInfo = `Time: ${selectedAppointment.apoinmenttime}, Date: ${selectedAppointment.appointmentDate}`;
    setSelectedItems([...selectedItems, appointmentInfo]);
    setIsButtonDisabled(true);
    };
    const handleAddTest = (testId) => {
      setSelectedTestId(testId);
      const selectedTest = tests.find(test => test._id === testId);
      const testInfo = `Test Name: ${selectedTest.testname}, Test Price: ${selectedTest.price}`;
      setSelectedItems([...selectedItems, testInfo]);
      setIsButtonDisabled2(true);
      setprice(selectedTest.price);
    };
    
    const handlePaymentData = async (paymentData) => {
      try {
        // Send payment information to the API
        await axios.post("http://localhost:8089/api/v1/payment/save", {
          patientId: userId,
          apoinmentId: selectedAppointmentId, 
          testID: selectedTestId, 
          paymentStatus: true
        });
        const appointmentDetails = Appoinments.find(appointment => appointment._id === selectedAppointmentId);
    
        // Update paymentStatus state
        
        await axios.put(`http://localhost:8089/api/v1/Appoinment/edit/${selectedAppointmentId}`, {
          paymentStatus: true,
          patientId: userId,
          apoinmenttime: appointmentDetails.apoinmenttime, 
          appointmentDate: appointmentDetails.appointmentDate 
          
    });

    // Update paymentStatus state
    setpaymentStatus(true);
      } catch (error) {
        console.error('Error sending payment data:', error);
      }
    };

    

  
    return (
      <div>
         <Nav onLogout={handleLogout} />
        <div className="col-12 text-center">
          <h2 className="mb-5">Make Your Appointment Here</h2>
          </div>
          <div  className="col-12" style={{ margin: '0px 100px' }}> 
            
          <p style={{ fontWeight: 'bold' }}>PLEASE PICK THE TIME</p>
          </div>
          <div className="container mt-4">
          
          <div className="form-group">
          </div>
          </div>
          <div className="d-flex justify-content-center">
  <table className="table table-striped" style={{ width: '80%' }}>
    <thead>
      <tr>
      
        <th className="text-center" scope="col">Time</th>
        <th className="text-center" scope="col">Date</th>
        {/* <th scope="col">Availibilty</th> */}
        <th className="text-center" scope="col">Make the Appoinment</th>

      </tr>
    </thead>
    {Appoinments.map((Appoinment) => (
    <tbody key={Appoinment._id}>
      <tr className="text-center"> 
      
        <td>{Appoinment.apoinmenttime}</td>
        <td>{Appoinment.appointmentDate}</td>
        <td className="text-center">
        <button type="button" className="btn btn-warning"  
        onClick={() => handleAddAppointment(Appoinment._id)  }
        disabled={isButtonDisabled}
        > Add</button>

      </td>
        
      </tr>
    </tbody>
  ))}
  </table>
  </div>
<br/>

 <div  className="col-12" style={{ margin: '0px 100px' }}> 
  <p style={{ fontWeight: 'bold' }}>PLEASE PICK THE TEST</p>
  </div>
  <div className="d-flex justify-content-center">
  <table className="table table-striped" style={{ width: '80%' }}>
    <thead>
      <tr className="text-center">
      
        <th scope="col">Test Name</th>
        <th scope="col">Test Price</th>
        <th scope="col">Make the Appoinment</th>

      </tr>
    </thead>
    {tests.map((test) => (
    <tbody key={test._id}>
      <tr className="text-center">
        <td>{test.testname}</td>
        <td>{test.price}</td>
        <td>
        <button type="button" className="btn btn-warning" onClick={() => handleAddTest(test._id)}   disabled={isButtonDisabled2}> Add</button>
      </td>
        
      </tr>
    </tbody>
  ))}
  </table>
  </div>
  
  <div className="form-group">
  <div  className="col-6" style={{ margin: '0px 150px' }}> 
  <label>YOU HAVE PICKED</label>
        <input
          type="text"
          className="form-control"
          id="tprice"
          value={selectedItems.join(', ')}
          readOnly // Make the input box read-only
        />
        <GooglePayButton
  environment="TEST"
  paymentRequest={{
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: price,
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }}
  onLoadPaymentData={paymentRequest => {

    console.log('load payment data', paymentRequest);
    handlePaymentData();
   
  }}
 
/>
</div>
<br/>
<br/>
            <div className='text-center'>
              
              
</div>
<div  className="col-12" style={{ margin: '0px 100px' }}> 
            
            <p style={{ fontWeight: 'bold' }}>YOUR APPOINMENTS</p>
            </div>
            <div className="d-flex justify-content-center">
  <table className="table table-striped" style={{ width: '80%' }}>
        <thead>
          <tr>
          <th>ID</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {userAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment._id}</td>
              <td>{appointment.apoinmenttime}</td>
              <td>{appointment.appointmentDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
</div>

</div>
  
    );
  };
  
  export default PatientApo;