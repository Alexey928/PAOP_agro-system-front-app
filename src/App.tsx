import React, {useState} from 'react';
import './App.css';
import Login from "./components/Login/Login"
import {Navigate, Route, Routes} from 'react-router-dom';
import GeneralAgronomist from "./components/General_agronomist/General_agronomist";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const swithRole = ():React.ReactNode=>{
        switch (userRole) {
            case null:return <Navigate to={"/login"}/>
            case "GENERAL_AGRONOMIST":return <Navigate to={"/general-agronomist"}/>
            default:return <Navigate to={"/login"}/>
       }
    }
 return (
    <div className="App">
        <Routes>
            <Route path="/"  element={(swithRole())} />
            <Route path = {"/general-agronomist"} element={<GeneralAgronomist/>}/>
            <Route path={"/login"} element={<Login/>}/>

        </Routes>

    </div>
  );
}
export default App;
