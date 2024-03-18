import axios from 'axios';
import {useEffect, useState } from "react";
import Nav from "../Components/Nav";
import '../App.css';
// import { useHistory } from 'react-router-dom';

// import * as yup from 'yup';
// import {useFormik} from 'formik';
import { useLocation, useNavigate  } from 'react-router-dom';
function PatientManagement()
{
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
//logic
const [_id, setPid] = useState('');
const [fristname, setfristname] = useState('');
  const [lastname, setlastname] = useState("");
  const [nic, setNic] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lusername, setlUsername] = useState("");
  const [lpassword, setlPassword] = useState("");
  const [patients, setpatients] = useState([]);

  

 
useEffect(() => {
  (async () => await Load())();
  }, []);
 
 
  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8089/api/v1/patient/getAll");
         setpatients(result.data);
         console.log(result.data);
  }
 

  
     async function save(event)
   {
       if (!fristname || !lastname || !nic || !phonenum || !email || !username || !password) {//emptyboxxes
        alert('Check again');
        return; 
    }
    if (password.length < 8) {
      alert('Password should be 8 characters or more.');//datavalidation
      return;
    }

    if (fristname.length > 20 || lastname.length > 20) {
      alert('First name and last name should be less than 20 characters.');
      return;
    }
    if (isUsernameTaken) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
    

        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8089/api/v1/patient/save",
        {
            //_id: _id,
            fristname: fristname,
            lastname: lastname,
            nic: nic,
            phonenum: phonenum,
            email: email,
            username: username,
            password: password

        });
          alert("Wellcome to Xclepius");
          setPid("");
          setfristname("");
          setlastname("");
          setNic("");
          setPhonenum("");
          setEmail("");
          setUsername("");
          setPassword("");
          Load();
        }
    catch(err)
        {
          alert("Registation Failed");
        }
        
         
   }

 
   async function editPatients(patients)
   {
    setfristname(patients.fristname);
    setlastname(patients.lastname);
    setNic(patients.nic);
    setPhonenum(patients.phonenum);
    setEmail(patients.email);
    setUsername(patients.username);
    setPassword(patients.password); 
    setPid(patients._id);
   }
 
   async function DeletePatient(pid)
   {
        await axios.delete("http://localhost:8089/api/v1/patient/delete/" + pid); 
        alert("You have Deleted you account");
        Load();
   }
 
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://localhost:8089/api/v1/patient/edit/" + _id ,
       {

        fristname: fristname,
        lastname: lastname,
        nic: nic,
        phonenum: phonenum,
        email: email,
        username: username,
        password: password
       
       });
         alert("Details Have Been Updated");
        setPid("");
          setfristname("");
          setlastname("");
          setNic("");
          setPhonenum("");
          setEmail("");
          setUsername("");
          setPassword("");
          Load();
       }
   catch(err)
       {
         alert("Update Failed");
       }

       
  }
  // const history = useHistory();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:8089/api/v1/patient/getAll");
        setpatients(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const login = () => {
    // Check if the entered username and password match the fetched data
    const isValidCredentials = patients.some(
      patient => patient.username === lusername && patient.password === lpassword
    );

    if (isValidCredentials) {
      // If they match, redirect to the login page
      navigate('/homepage'); // Replace '/login' with the actual path you want to redirect to
    } else {
      // If they don't match, you can handle it (e.g., show an error message)
      alert(" Failed");
    }

  };
  const checkusername = () => {
    // Check if the entered username and password match the fetched data
    const isValidCredentials = patients.some(
      patient => patient.username === username 
    );

    if (isValidCredentials) {
      // If they match, redirect to the login page
      alert(" Username Aleady Exists");// Replace '/login' with the actual path you want to redirect to

    }
  };
  const isUsernameTaken = patients.some(patient => patient.username === username);
  

//design
return (
  
    <div>
       <Nav onLogout={handleLogout} />
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
                <label>Nic</label>
                <input  type="text" className="form-control" id="nic" 
                 value={nic}
                  onChange={(event) =>
                    {
                        setNic(event.target.value);      
                    }}
                    //{...formik.getFieldProps("nic")}
                />
              </div>

              <div className="form-group">
                <label>Mobile</label>
                <input type="text" className="form-control" id="phonenum" 
                  value={phonenum}
                onChange={(event) =>
                  {
                    setPhonenum(event.target.value);      
                  }}
                  //{...formik.getFieldProps("phonenum")}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" id="email" 
                  value={email}
                onChange={(event) =>
                  {
                    setEmail(event.target.value);      
                  }}
                  //{...formik.getFieldProps("email")}
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" id="username" 
                  value={username}
                onChange={(event) =>
                  {
                    setUsername(event.target.value);      
                  }}
                  //{...formik.getFieldProps("username")}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="text" className="form-control" id="password" 
                  value={password}
                onChange={(event) =>
                  {
                    setPassword(event.target.value);      
                  }}
                  //{...formik.getFieldProps("password")}
                />


{/* 
              </div>
              <div className="form-group">
                <label>LUsername</label>
                <input type="text" className="form-control" id="lusername" 
                  value={lusername}
                onChange={(event) =>
                  {
                    setlUsername(event.target.value);      
                  }}
                />
              </div>
              <div className="form-group">
                <label>LPassword</label>
                <input type="text" className="form-control" id="lpassword" 
                  value={lpassword}
                onChange={(event) =>
                  {
                    setlPassword(event.target.value);      
                  }}
                /> */}
              </div>

              <div>
              <button type="submit"  className="btn btn-primary mt-4"  onClick={save}>Register</button>
              {/* <button   className="btn btn-primary mt-4"  onClick={login}>Login</button> */}
              <button   className="btn btn-warning mt-4"  onClick={update}>Update</button>
              {/* <button   className="btn btn-warning mt-4"  onClick={checkusername}>C</button> */}
              </div>   
            </form>
          </div>
                <br/>
<table className="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Frist Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">NIC</th>
      <th scope="col">Mobile</th>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
      <th scope="col">Password</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {patients.map(function fn(patient)
       {
            return(
            <tbody>
                <tr>
                <td>{patient._id}</td>
                <td>{patient.fristname}</td>
                <td>{patient.lastname}</td>
                <td>{patient.nic}</td> 
                <td>{patient.phonenum}</td>     
                <td>{patient.email}</td>     
                <td>{patient.username}</td> 
                <td>{patient.password}</td>                
                <td>
                    <button type="button" className="btn btn-warning"  onClick={() => editPatients(patient)} >Edit</button>  
                    <button type="button" className="btn btn-danger" onClick={() => DeletePatient(patient._id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
  
  export default PatientManagement;
  