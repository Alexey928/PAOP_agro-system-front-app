import {NavigateFunction} from "react-router-dom";
import {ROOLS} from "../API/AuthApi";

const RedirectFromRole = () => {
    let curentRole:ROOLS|null
    return (navigate:NavigateFunction,role:ROOLS|null)=>{
    if(curentRole === role) return ;
    curentRole = role
    role==="GENERAL_AGRONOMIST" && navigate("/general-agronomist");
    role==="SIMPLE_AGRONOMIST" && navigate("/")
    role==="ACCOUNTANT" && navigate("/")}
};
export default RedirectFromRole;