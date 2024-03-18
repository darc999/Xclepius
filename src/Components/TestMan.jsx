import axios from 'axios';
import {useEffect, useState } from "react";
import Nav from "../Components/Nav";
import '../App.css';
// import { useHistory } from 'react-router-dom';
import { useLocation, useNavigate  } from 'react-router-dom';
// import * as yup from 'yup';
// import {useFormik} from 'formik';

function Testman()
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
const [testname, settestname] = useState('');
  const [price, setprice] = useState("");
  const [Tests, setTests] = useState([]);

  

 
useEffect(() => {
  (async () => await Load())();
  }, []);
 
 
  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8089/api/v1/Test/getAll");
         setTests(result.data);
         console.log(result.data);
  }
 

  
     async function save(event)
   {
       if (!testname || !price ) {//emptyboxxes
        alert('Check again');
        return; 
    }
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8089/api/v1/Test/save",
        {
            //_id: _id,
            testname: testname,
            price: price,

        });
          alert("Wellcome to Xclepius");
          setPid("");
          settestname("");
          setprice("");
          Load();
        }
    catch(err)
        {
          alert("Registation Failed");
        }
        
         
   }

 
   async function editTests(Tests)
   {
    settestname(Tests.testname);
    setprice(Tests.price);
    setPid(Tests._id);
   }
 
   async function DeleteTest(pid)
   {
        await axios.delete("http://localhost:8089/api/v1/Test/delete/" + pid); 
        alert("You have Deleted you account");
        Load();
   }
 
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://localhost:8089/api/v1/Test/edit/" + _id ,
       {

        testname: testname,
        price: price,
       
       });
         alert("Details Have Been Updated");
        setPid("");
          settestname("");
          setprice("");
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
        const result = await axios.get("http://localhost:8089/api/v1/Test/getAll");
        setTests(result.data);
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 


  
//design
return (
  
    <div>
       <Nav onLogout={handleLogout} />
      <div className="col-12 text-center">
       <h2 className="slick-title" >Test <span>Details</span></h2>
       </div>
       <div className="container mt-4" >
       <form >
             
              <div className="form-group">
                <label>Test Name</label>
                <input  type="text" className="form-control" id="testname"
                
                value={testname}
                onChange={(event) =>
                  {
                    settestname(event.target.value); 
                         
                  }}
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input  type="text" className="form-control" id="price"
                value={price}
                onChange={(event) =>
                  {
                    setprice(event.target.value);      
                  }}
                />
              </div>
              <div>
              <button type="submit"  className="btn btn-primary mt-4"  onClick={save}>ADD</button>
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
      <th scope="col">Test Name</th>
      <th scope="col">Price</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {Tests.map(function fn(Test)
       {
            return(
            <tbody>
                <tr>
                <td>{Test._id}</td>
                <td>{Test.testname}</td>
                <td>{Test.price}</td>
                    
                <td>
                    <button type="button" className="btn btn-warning"  onClick={() => editTests(Test)} >Edit</button>  
                    <button type="button" className="btn btn-danger" onClick={() => DeleteTest(Test._id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
       </div>
            );
        }
  
  export default Testman;
  