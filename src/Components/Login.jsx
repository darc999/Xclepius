import axios from 'axios';
import { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userType, setUserType] = useState("patient"); // Default user type is patient
  const [lUsername, setlUsername] = useState("");
  const [lPassword, setlPassword] = useState("");
  const [patients, setPatients] = useState([]);
  const [Technicians, setTechnicians] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Load patient and Technician data when the component mounts
    loadPatients();
    loadTechnicians();
    loadAdmins();
  }, []);

  const loadPatients = async () => {
    const result = await axios.get("http://localhost:8089/api/v1/patient/getAll");
    setPatients(result.data);
  };

  const loadTechnicians = async () => {
    const result = await axios.get("http://localhost:8089/api/v1/Technician/getAll");
    setTechnicians(result.data);
  };
  const loadAdmins = async () => {
    const result = await axios.get("http://localhost:8089/api/v1/Admin/getAll");
    setAdmins(result.data);
  };

  const navigate = useNavigate();

  const login = () => {
    // Use userType state to determine whether to check patients or Technicians
    const users = userType === "patient" ? patients : userType === "Technician" ? Technicians : admins;

    const loggedInUser = users.find(
      user => user.username === lUsername && user.password === lPassword
    );

    if (loggedInUser) {
      const loggedInUserId = loggedInUser._id;

      if (loggedInUserId) {

        //alert(`Logged in with ID: ${loggedInUserId}`);

        let path = '/patientl';

      if (userType === 'Technician') {
        path = '/Technician';
      } else if (userType === 'admin') {
        path = '/admin';
      }

      // Navigate to the appropriate path
      navigate(path, { state: { userId: loggedInUser._id } });
      } else {
       // alert("User ID is undefined for the logged-in user.");
      }
    } else {
     // alert("Incorrect username or password.");
    }

    
  };

  

  return (
    <div>
      <Nav></Nav>
      <div className="col-12 text-center">
        <h2 className="slick-title">Login <span>Page</span></h2>
      </div>
      <div className="container mt-4">
        <form>
        <div className="form-group">
            <label>Select User Type</label>
            <select
              className="form-control"
              value={userType}
              onChange={(event) => {
                setUserType(event.target.value);
              }}
            >
              <option value="patient">Patient</option>
              <option value="Technician">Technician</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Login Username</label>
            <input
              type="text"
              className="form-control"
              id="lusername"
              value={lUsername}
              onChange={(event) => {
                setlUsername(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Login Password</label>
            <input
              type="password"
              className="form-control"
              id="lpassword"
              value={lPassword}
              onChange={(event) => {
                setlPassword(event.target.value);
              }}
            />
          </div>
          
          <div>
            <button className="btn btn-primary mt-4" onClick={login}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
