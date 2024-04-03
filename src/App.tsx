import React, {useMemo, useState} from 'react';
import './App.css';
import Registration from "./components/Registration/Registration"
import {Navigate, Route, Routes} from 'react-router-dom';
import GeneralAgronomist from "./components/General_agronomist/General_agronomist";
import Login from "./components/Login/Login";
import {useSelector} from "react-redux";
import {selectAppInitStatus} from "./Utils/selectors";

function App() {
    const [userRole, setUserRole] = useState<string | null>(null);
    const isAppInitialized = useSelector(selectAppInitStatus)

    const swithRole:React.ReactNode = useMemo(()=> {
        switch (userRole) {
            case null:return <Navigate to={"/registration"}/>
            case "GENERAL_AGRONOMIST":return <Navigate to={"/general-agronomist"}/>
            default:return <Navigate to={"/registration"}/>
        }
    },[])

    if (!isAppInitialized) {
        return (
            <div >
                Preloader
            </div>
        );
    }


 return (
    <div className="App">
        <Routes>
            <Route path="/"  element={(swithRole)} />
            <Route path = {"/general-agronomist"} element={<GeneralAgronomist/>}/>
            <Route path={"/registration"} element={<Registration/>}/>
            <Route path="/login" element={<Login/>} />
        </Routes>
    </div>
  );
}
export default App;
