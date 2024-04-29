import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import {AppActionsType, setAppErrorAC} from "../BLL/app-reduser";
import {AuthActionsType, setAuthUserDataAC} from "../BLL/auth-reduser";
import {useNavigate} from "react-router-dom";
import {FieldStateActionType} from "../BLL/map-filds-reduser";

type DispathTYpe = AppActionsType|AuthActionsType|FieldStateActionType

export const handleError = (e: unknown, dispatch: Dispatch<DispathTYpe>, errHoldTime?:number) => {
    //const navigate = useNavigate()
    const err = e as Error | AxiosError<{ error: string }>;
    debugger
    if (axios.isAxiosError(err)) {
        const error = err.response?.data.message || err.message;
        switch (error){
            case "Unauthorized":
                setAuthUserDataAC(null,null,null,null,false);
                debugger
                break
            case "any":


        }

        dispatch(setAppErrorAC(error));
        dispatch(setAuthUserDataAC(null,null,null,null,false))
    } else {
        dispatch(setAppErrorAC("some error has occurred"));
    }
    setTimeout(() => {
        dispatch(setAppErrorAC(null));
    }, errHoldTime??3000);
};