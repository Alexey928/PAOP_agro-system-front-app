import React from 'react';
import {redirect} from "react-router-dom";
type RedirectPropsType ={
    linc:string
}

// пока не юзаеется нигде
const Redirect:React.FC<RedirectPropsType> = ({linc}) => {
    redirect(linc)
    return (
        <>
        </>
    );
};

export default Redirect;