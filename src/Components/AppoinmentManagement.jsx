import axios from 'axios';
import '../App.css';
import Nav from './Nav';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

const AppointmentManagement = () => {

  const location = useLocation();
    const navigate = useNavigate();
    const [userId, setPatientId] = useState(location.state?.userId || '');
    useEffect(() => {
      //alert('Current patientId: ' + userId);
    }, [userId]);
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
  const [selectedDay, setSelectedDay] = useState('');
  const [generatedTimeSlots, setGeneratedTimeSlots] = useState([]);


  async function Load() {
    const result = await axios.get("http://localhost:8089/api/v1/Appoinment/getAll");
    setAppoinments(result.data);
    console.log(result.data);
  }

  async function editAppoinments(Appoinments)
   {
    setpatientId(Appoinments.patientId);
    setpaymentStatus(Appoinments.paymentStatus);
    setapoinmenttime(Appoinments.apoinmenttime);
    setappointmentDate(Appoinments.appointmentDate);
    setPid(Appoinments._id);
   }
 
   async function DeleteAppoinments(pid)
   {
        await axios.delete("http://localhost:8089/api/v1/Appoinment/delete/" + pid); 
        alert("You have Deleted the Appoinment");
        Load();
   }

   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://localhost:8089/api/v1/Appoinment/edit/" + _id ,
       {

            patientId: patientId,
            paymentStatus: paymentStatus,
            apoinmenttime: apoinmenttime,
            appointmentDate: appointmentDate,
            
       
       });
         alert("Details Have Been Updated");
          setPid("");
          setpaymentStatus("");
          setapoinmenttime("");
          setappointmentDate("");
          Load();
       }
   catch(err)
       {
         alert("Update Failed");
       }

       
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8089/api/v1/Appoinment/getAll");
        setAppoinments(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 



  const generateTimeSlots = () => {
   const startTime = 8;
  const endTime = 18;
  const interval = 2;

  const timeSlots = [];
  for (let i = startTime; i < endTime; i += interval) {
    timeSlots.push({
      patientId: '',
      apoinmenttime: `${i}:00`,
      appointmentDate: selectedDay,
    });
  }

  setGeneratedTimeSlots(timeSlots);
  };

  const saveTimeSlots = () => {
    axios.post('http://localhost:8089/api/v1/Appoinment/save', generatedTimeSlots)
      .then(response => {
        console.log('Appointments saved successfully!', response);
      })
      .catch(error => {
        console.error('Error saving appointments:', error);
      });
  };
  const handleLogout = () => {
    // Perform logout actions
    navigate('/homepage');
    setPatientId('');
    alert('Logged out');
};

  return (
    <div>
      <Nav onLogout={handleLogout} />
      <div className="col-12 text-center">
        <h2 className="mb-5">Appoinment Management</h2>
        </div>
        <div className="container mt-4">
          <form>
          <div className="form-group">
      <label className="form-control">Select a day:</label>
      <input  className="form-control" type="date" value={selectedDay} onChange={e => setSelectedDay(e.target.value)} />
      </div>
      <div className="form-group">
                <label>PatientID</label>
                <input  type="text" className="form-control" id="patientId"
                value={patientId}
                onChange={(event) =>
                  {
                    setpatientId(event.target.value);      
                  }}
                 
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input  type="text" className="form-control" id="apoinmenttime"
                value={apoinmenttime}
                onChange={(event) =>
                  {
                    setapoinmenttime(event.target.value);      
                  }}
                 
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input  type="text" className="form-control" id="appointmentDate"
                value={appointmentDate}
                onChange={(event) =>
                  {
                    setappointmentDate(event.target.value);      
                  }}
                 
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input  type="text" className="form-control" id="paymentStatus"
                value={paymentStatus}
                onChange={(event) =>
                  {
                    setpaymentStatus(event.target.value);      
                  }}
                 
                />
              </div>
              
      </form>
      
      <button className="btn btn-primary mt-4" onClick={generateTimeSlots}>Generate Time Slots</button>
      
      
      <button className="btn btn-primary mt-4" onClick={saveTimeSlots}>Save Time Slots</button>
      <button   className="btn btn-warning mt-4"  onClick={update}>Update</button>
     
      <div className="form-group">
     
      </div>
      
      </div>
      <div>
      <ul>
        {generatedTimeSlots.map((timeSlot, index) => (
          <li key={index}>
            {timeSlot.apoinmenttime} - {timeSlot.appointmentDate}
          </li>
        ))}
      </ul>
      </div>
      <table className="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">patientId</th>
      <th scope="col">Time</th>
      <th scope="col">Date</th>
      <th scope="col">Payment Status</th>
      <th scope="col">Option</th>
    </tr>
  </thead>
  {Appoinments.map((Appoinment) => (
  <tbody key={Appoinment._id}>
    <tr>
      <td>{Appoinment._id}</td>
      <td>{Appoinment.patientId}</td>
      <td>{Appoinment.apoinmenttime}</td>
      <td>{Appoinment.appointmentDate}</td>
      <td>{Appoinment.paymentStatus ? "Yes" : "No"}</td>  
      <td>
        <button type="button" className="btn btn-warning" onClick={() => editAppoinments(Appoinment)}> Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => DeleteAppoinments(Appoinment._id)}> Delete</button>
        {/* <button type="button" className="btn btn-danger" onClick={() => handleManageAppointments(Technician._id)}>Add Appointments</button> */}
      </td>
    </tr>
  </tbody>
))}
    </table>
    </div>

  );
};

export default AppointmentManagement;