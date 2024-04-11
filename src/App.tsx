import React, {useEffect, useMemo } from 'react';
import './App.css';
import Registration from "./components/Registration/Registration"
import {Navigate, NavigateFunction, Route, Routes, useNavigate} from 'react-router-dom';
import GeneralAgronomist from "./components/General_agronomist/General_agronomist";
import Login from "./components/Login/Login";
import {useSelector} from "react-redux";
import {selectAppError, selectAppInitStatus, selectUserRole} from "./Utils/selectors";
import {useAppDispatch} from "./BLL/Store";
import {initializeAppTC} from "./BLL/app-reduser";
import Preloader from "./components/Common/generalPreloader/Preloader";
import RedirectFromRole from "./Utils/Redirect";

function App() {
    const isAppInitialized = useSelector(selectAppInitStatus);
    const role = useSelector(selectUserRole);
    const appError = useSelector(selectAppError)
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();
    console.log("app")
    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    const redirect = useMemo(()=>{
      return  RedirectFromRole()
    },[role])

     useEffect(()=>{
         role && redirect(navigate,role)
    },[role])


    const switchRole = ()=> {
        switch (role) {
            case null:return <Navigate to = {"/login"}/>
            case "GENERAL_AGRONOMIST":return <Navigate to = {"/general-agronomist"}/>
            default:return <Navigate to = {"/login"}/>
        }
    }

    if (!isAppInitialized || appError) {
        return (
            <div >
                <Preloader/>
            </div>
        );
    }
return (
    <div className="App">
        <Routes>
            <Route path="/"  element={switchRole()} />
            <Route path = {"/general-agronomist"} element={<GeneralAgronomist/>}/>
            <Route path={"/registration"} element={<Registration/>}/>
            <Route path="/login" element={<Login/>} />
        </Routes>
    </div>
  );
}
export default App;
