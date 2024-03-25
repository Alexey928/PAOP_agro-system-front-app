import React, {useState} from 'react';
import './App.css';
import Login from "./components/Login"
import {Navigate, Route, Routes} from 'react-router-dom';
import Redirect from "./Utils/Redirect";
import switchBaseClasses from "@mui/material/internal/switchBaseClasses";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const swithRole = ():React.ReactNode=>{
        switch (userRole) {
            case null:return <Navigate to={"login"}/>
            case "GENERAL_AGRONOMIST":return <Navigate to={"/general-agronomist"}/>
            default:return <Navigate to={"/login"}/>
       }
    }
 return (
    <div className="App">
        <Routes>
            <Route path="/"  element={(swithRole())} />
            <Route path={"/login"} element={<Login/>}/>
        </Routes>

    </div>
  );
}
export default App;
