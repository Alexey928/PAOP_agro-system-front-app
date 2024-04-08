import React, {useEffect, useMemo } from 'react';
import './App.css';
import Registration from "./components/Registration/Registration"
import {Navigate, Route, Routes} from 'react-router-dom';
import GeneralAgronomist from "./components/General_agronomist/General_agronomist";
import Login from "./components/Login/Login";
import {useSelector} from "react-redux";
import {selectAppError, selectAppInitStatus, selectUserRole} from "./Utils/selectors";
import {useAppDispatch} from "./BLL/Store";
import {initializeAppTC} from "./BLL/app-reduser";
import Preloader from "./components/Common/generalPreloader/Preloader";

function App() {
    const isAppInitialized = useSelector(selectAppInitStatus);
    const role = useSelector(selectUserRole);
    const appError = useSelector(selectAppError)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    const switchRole:React.ReactNode = useMemo(()=> {
        switch (role) {
            case null:return <Navigate to={"/login"}/>
            case "GENERAL_AGRONOMIST":return <Navigate to={"/general-agronomist"}/>
            default:return <Navigate to={"/login"}/>
        }
    },[role])

    if (!isAppInitialized||appError) {
        return (
            <div >
                <Preloader/>
            </div>
        );
    }
return (
    <div className="App">
        <Routes>
            <Route path="/"  element={(switchRole)} />
            <Route path = {"/general-agronomist"} element={<GeneralAgronomist/>}/>
            <Route path={"/registration"} element={<Registration/>}/>
            <Route path="/login" element={<Login/>} />
        </Routes>
    </div>
  );
}
export default App;
