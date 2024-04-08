import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";
import {AppActionsType, setAppErrorAC} from "../BLL/app-reduser";
import {AuthActionsType, setAuthUserDataAC} from "../BLL/auth-reduser";

export const handleError = (e: unknown, dispatch: Dispatch<AppActionsType|AuthActionsType>,errHoldTime?:number) => {
    const err = e as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
        const error = err.response?.data.error || err.message;
        dispatch(setAppErrorAC(error));
        dispatch(setAuthUserDataAC(null,null,null,null,false))
    } else {
        dispatch(setAppErrorAC("some error has occurred"));
    }
    setTimeout(() => {
        dispatch(setAppErrorAC(null));
    }, errHoldTime??3000);
};