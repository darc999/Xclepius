import axios from 'axios';
import '../App.css';
import Nav from './Nav';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

const TestManagment = () => {

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
  useEffect(() => {
    if (!userId) {
        navigate('/login'); // Redirect to login route if userId is not available
    }
}, [userId, navigate]);
  useEffect(() => {
    (async () => await Load())();
    }, []);

  const [_id, setPid] = useState('');
  const [patientId, setpatientId] = useState('');
  const [paymentStatus, setpaymentStatus] = useState("");
  const [apoinmenttime, setapoinmenttime] = useState("");
  const [appointmentDate, setappointmentDate] = useState("");
  const [Appoinments, setAppoinments] = useState([]);
  const [fristname, setfristname] = useState("");
  const [lastname, setlastname] = useState("");
  const [testname, settestname] = useState("");
  const [tesres, setTestres] = useState("");
  const [Tests, setTests] = useState([]);
  const [testID, settestID] = useState([]);
  const [Payments, setPayments] = useState([]);
  const [Patients, setPatient] = useState([]);
  const [file,setFile] = useState(null);
  const [appoinmentID, setappoinmentID] = useState('');

 


  async function Load() {
    try {
      const result = await axios.get("http://localhost:8089/api/v1/payment/getAll");
      const unpaidPayments = result.data.filter(payment => !payment.serviceStatus);
      setPayments(unpaidPayments);
      console.log(unpaidPayments.data);
     

    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
    try {
        const result = await axios.get("http://localhost:8089/api/v1/patient/getAll");
        setPatient(result.data);
        console.log(result.data);
      
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
      try {
        const result = await axios.get("http://localhost:8089/api/v1/Test/getAll");
        setTests(result.data);
        console.log(result.data);
       
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }

        }

  async function ShowDetails(patients)
  {
   
  }

  const getPatientDetails = async (patientId,apoinmentId,testIDid) => {
    try {
        
      const response = await axios.get(`http://localhost:8089/api/v1/patient/search/`+patientId);
      // Assuming the response contains a property called 'fristname' for the first name
      const { fristname } = response.data;
      setfristname(fristname);
      Load();
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
    try {
        
      const response = await axios.get(`http://localhost:8089/api/v1/patient/search/`+patientId);
      // Assuming the response contains a property called 'fristname' for the first name
      const { lastname } = response.data;
      setlastname(lastname);
      Load();
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
    try {
       
      const response = await axios.get(`http://localhost:8089/api/v1/Appoinment/search/`+apoinmentId);
      // Assuming the response contains a property called 'fristname' for the first name
      const { apoinmenttime } = response.data;
      const { appointmentDate } = response.data;
      setapoinmenttime(apoinmenttime);
      setappointmentDate(appointmentDate);
      Load();
    } catch (error) {
      console.error('Error fetching patient details:', error);
    }
    try {
        
        const response = await axios.get(`http://localhost:8089/api/v1/Test/search/`+testIDid);
        // Assuming the response contains a property called 'fristname' for the first name
        const { testname } = response.data;
        settestname(testname);
        Load();
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }

      setpatientId(patientId);
      setappoinmentID(apoinmentId);
      settestID(testIDid);

  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('appoinmentID', appoinmentID);
    formData.append('patientID', patientId);
    formData.append('TestID', testID);

    try {
      const response = await axios.post('http://localhost:8089/api/v1/Report/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const serviceStatus = async (paymentId) => {
    try {
      // Send a PUT request to update the service status of the payment
      await axios.put(`http://localhost:8089/api/v1/payment/edit/${paymentId}`, {
        serviceStatus: true // Set the serviceStatus field to true
      });
  
      // Update the serviceStatus state if needed
      // setServiceStatus(true);
  
      // Optionally, display a success message to the user
      alert('Service status updated successfully');
    } catch (error) {
      console.error('Error updating service status:', error);
      // Optionally, display an error message to the user
      alert('Error updating service status. Please try again later.');
    }
  };

  console.log(Payments.apoinmentId);

  return (
    <div>
    <Nav onLogout={handleLogout} />
      <div className="col-12 text-center">
        <h2 className="mb-5">TEST Management</h2>
        </div>
        <div className="container mt-4">
      </div>
      
      <table className="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Apoinment id</th>
      <th scope="col">patient Id</th>
      <th scope="col">Test ID</th>
      <th scope="col">Payment Status</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  {Payments.map((payment) => (
  <tbody key={payment._id}>
    <tr>
      <td>{payment.apoinmentId}</td>
      <td>{payment.patientId}</td>
      <td>{payment.testIDId}</td>
      <td>{payment.paymentStatus ? "Yes" : "No"}</td>  
      <td>
      <button type="button" className="btn btn-warning"  onClick={() => getPatientDetails(payment.patientId,payment.apoinmentId,payment.testIDId)} >Get Details</button>
      <button type="button" className="btn btn-warning"  onClick={() => serviceStatus(payment._id)} >Complete</button>    
      </td>
    </tr>
  </tbody>
))}
    </table>
    <div className="col-12 text-center">
       <h2 className="slick-title" >Patient <span>Details</span></h2>
       </div>
       <div className="container mt-4" >
       <form >
             
              <div className="form-group">
                <label>Frist Name</label>
                <input  type="text" className="form-control" id="fristname"
                
                value={fristname}
                onChange={(event) =>
                  {
                    setfristname(event.target.value); 
                         
                  }}
                  //{...formik.getFieldProps("fristname")}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input  type="text" className="form-control" id="lastname"
                value={lastname}
                onChange={(event) =>
                  {
                    setlastname(event.target.value);      
                  }}
                  //{...formik.getFieldProps("lastname")}
                />
              </div>


              <div className="form-group">
                <label>Test Name</label>
                <input  type="text" className="form-control" id="nic" 
                 value={testname}
                  onChange={(event) =>
                    {
                        settestname(event.target.value);      
                    }}
                    //{...formik.getFieldProps("nic")}
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input type="text" className="form-control" id="appointmentDate" 
                  value={appointmentDate}
                onChange={(event) =>
                  {
                    setappointmentDate(event.target.value);      
                  }}
                  //{...formik.getFieldProps("phonenum")}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="text" className="form-control" id="apoinmenttime" 
                  value={apoinmenttime}
                onChange={(event) =>
                  {
                    setapoinmenttime(event.target.value);      
                  }}
                  //{...formik.getFieldProps("phonenum")}
                />
              </div>

    

              <div>
              
              
              </div>   
            </form>
            </div>



            <div className="container mt-4" >
            <form onSubmit={handleSubmit}>
      <div  className="form-group">
        <label htmlFor="appoinmentID">Appoinment ID :</label>
        <input className="form-control" type="text" id="appoinmentID" value={appoinmentID} onChange={(event) => setappoinmentID(event.target.value)} />
      </div>
      <div  className="form-group">
        <label htmlFor="patientID">Patient ID:</label>
        <input className="form-control" type="text" id="patientID" value={patientId} onChange={(event) => setpatientId(event.target.value)} />
      </div>
      <div  className="form-group">
        <label htmlFor="price">Test ID:</label>
        <input className="form-control" type="text" id="testID" value={testID} onChange={(event) => settestID(event.target.value)} />
      </div>
      <div  className="form-group">
        <label htmlFor="file">Choose a file:</label>
        <input className="form-control" type="file" id="file" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary mt-4"  type="submit">Upload</button>
    </form>
</div>

            </div>
    

  );
};

export default TestManagment;