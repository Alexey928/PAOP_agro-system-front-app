import React from 'react';
import {NavLink, redirect} from "react-router-dom";
type RedirectPropsType ={
    linc:string
}

const Redirect:React.FC<RedirectPropsType> = ({linc}) => {
    redirect(linc)
    return (
        <>
        </>
    );
};

export default Redirect;