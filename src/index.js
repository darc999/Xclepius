import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Patient from './Components/Patient';
import Homepage from './Components/Homepage';
import Login from './Components/Login';
import Technician from './Components/Technician';
import Pateintl from './Components/Patientl';
import Admin from './Components/Admin';
import TechnicianManagement from './Components/TechnicianManagement';
import AppointmentManagement from './Components/AppoinmentManagement';
import PatientApo from './Components/PatientApo';
import Testman from './Components/TestMan';
import PatientManagement from './Components/PatientManagement';
import TestManagment from './Components/TestManagement';
import PatReport from './Components/PatReport';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/patient",
    element: <Patient/>,
  },
  {
    path: "/homepage",
    element: <Homepage/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/Technician",
    element: <Technician/>,
  },
  {
    path: "/patientl",
    element: <Pateintl/>,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
  {
    path: "/Technicianmanagment",
    element: <TechnicianManagement/>,
  },
  {
    path: "/appointmentmanagement",
    element: <AppointmentManagement/>,
  },
  {
    path: "/patientApo",
    element: <PatientApo/>,
  },
  {
    path: "/testman",
    element: <Testman/>,
  },
  {
    path: "/patientmanagement",
    element: <PatientManagement/>,
  },
  {
    path: "/testmanagement",
    element: <TestManagment/>,
  },
  {
    path: "/patreport",
    element: <PatReport/>,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RouterProvider router={router} />
</React.StrictMode>
);


