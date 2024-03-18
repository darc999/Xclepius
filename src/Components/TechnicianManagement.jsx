import axios from 'axios';
import {useEffect, useState } from "react";
import Nav from "./Nav";
import '../App.css';
import { useLocation, useNavigate  } from 'react-router-dom';

function TechnicianManagement()
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
    useEffect(() => {
        (async () => await Load())();
        }, []);
       
  
//logic
    const [_id, setPid] = useState('');
    const [techname, setTechname] = useState('');
  const [field, setfield] = useState("");
  const [nic, setNic] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Technicians, setTechnicians] = useState([]);

  

 

 
  async function Load() {
    const result = await axios.get("http://localhost:8089/api/v1/Technician/getAll");
    setTechnicians(result.data);
    console.log(result.data);
  }
 

  
     async function save(event)
   {
       if (!techname || !field || !nic || !phonenum || !email || !username || !password) {
        alert('Check again');
        return;     
    }
    if (password.length < 8) {
      alert('Password should be 8 characters or more.');//datavalidation
      return;
    }

    if (techname.length > 20 || field.length > 20) {
      alert('Technician name and field  should be less than 20 characters.');
      return;
    }
    if (isUsernameTaken) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
    

        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8089/api/v1/Technician/save",
        {
            //_id: _id,
            techname: techname,
            field: field,
            nic: nic,
            phonenum: phonenum,
            email: email,
            username: username,
            password: password

        });
          alert("Wellcome to Xclepius");
          setPid("");
          setTechname("");
          setfield("");
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

 
   async function editTechnicians(Technicians)
   {
    setTechname(Technicians.techname);
    setfield(Technicians.field);
    setNic(Technicians.nic);
    setPhonenum(Technicians.phonenum);
    setEmail(Technicians.email);
    setUsername(Technicians.username);
    setPassword(Technicians.password); 
    setPid(Technicians._id);
   }
 
   async function DeleteTechnician(pid)
   {
        await axios.delete("http://localhost:8089/api/v1/Technician/delete/" + pid); 
        alert("You have Deleted the account");
        Load();
   }
 
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://localhost:8089/api/v1/Technician/edit/" + _id ,
       {

            techname: techname,
            field: field,
            nic: nic,
            phonenum: phonenum,
            email: email,
            username: username,
            password: password
       
       });
         alert("Details Have Been Updated");
          setPid("");
          setTechname("");
          setfield("");
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
        const result = await axios.get("http://localhost:8089/api/v1/Technician/getAll");
        setTechnicians(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const isUsernameTaken = Technicians.some(Technician => Technician.username === username);

  const navigates = useNavigate();

  const handleManageAppointments = (TechnicianId) => {
    // navigate(`/appointmentmanagement/${TechnicianId}`, { state: { TechnicianId } });
    
    navigates('/appointmentmanagement', { state: { TechnicianId } });
  };
  
  
 
//design
return (
  
    <div>
       <Nav onLogout={handleLogout} />
      <div className="col-12 text-center">
       <h2 className="slick-title" >Technician <span>Management</span></h2>
       </div>
       <div className="container mt-4" >
       <form >
             
              <div className="form-group">
                <label>Technician Name</label>
                <input  type="text" className="form-control" id="techname"
                
                value={techname}
                onChange={(event) =>
                  {
                    setTechname(event.target.value); 
                         
                  }}
                  
                />
              </div>

              <div className="form-group">
                <label>Field</label>
                <input  type="text" className="form-control" id="field"
                value={field}
                onChange={(event) =>
                  {
                    setfield(event.target.value);      
                  }}
                  
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
                  
                />



              </div>
             
            

              <div>
              <button type="submit"  className="btn btn-primary mt-4"  onClick={save}>Register</button>
              <button   className="btn btn-warning mt-4"  onClick={update}>Update</button>
              </div>   
            </form>
          </div>
                <br/>
<table className="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Technician Name</th>
      <th scope="col">Field</th>
      <th scope="col">NIC</th>
      <th scope="col">Mobile</th>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
      <th scope="col">Password</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
  {Technicians.map((Technician) => (
  <tbody key={Technician._id}>
    <tr>
      <td>{Technician._id}</td>
      <td>{Technician.techname}</td>
      <td>{Technician.field}</td>
      <td>{Technician.nic}</td>
      <td>{Technician.phonenum}</td>
      <td>{Technician.email}</td>
      <td>{Technician.username}</td>
      <td>{Technician.password}</td>
      <td>
        <button type="button" className="btn btn-warning" onClick={() => editTechnicians(Technician)}> Edit</button>
        <button type="button" className="btn btn-danger" onClick={() => DeleteTechnician(Technician._id)}> Delete</button>
        {/* <button type="button" className="btn btn-danger" onClick={() => handleManageAppointments(Technician._id)}>Add Appointments</button> */}
      </td>
    </tr>
  </tbody>
))}
            </table>
       </div>
            );
        }
  
  export default TechnicianManagement;
  