import {AppThunkType, DispatchType} from "./Store";
import {authAPI, ROOLS} from "../API/AuthApi";
import {setIsRequestProcessingStatusAC} from "./app-reduser";
import axios, {AxiosError} from "axios";

const initialState = {
    id: null as number | null,
    email: null as string | null,
    name: null as string | null,
    role:null as string|null,
    isAuth: false as boolean,
    authError: null as string | null,
};

export type InitialStateType = typeof initialState;

export type AuthActionsType =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof setCaptchaUrlAC>
    | ReturnType<typeof setLoginErrorAC>;

export const setLoginErrorAC = (authError: string | null) =>
    ({ type: "AUTH/SET-LOGIN-ERROR", authError } as const);

export const setCaptchaUrlAC = (captchaUrl: string | null) =>
    ({ type: "AUTH/SET-CAPTCHA", captchaUrl } as const);

export const setAuthUserDataAC = (
    id: number | null,
    role: ROOLS| null,
    email: string | null,
    isAuth: boolean
) =>
    ({
        type: "AUTH/SET-AUTH-USER-DATA",
        payload: {
            id,
            role,
            email,
            isAuth,
        },
    } as const);


export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-AUTH-USER-DATA":
            return { ...state, ...action.payload };
        case "AUTH/SET-LOGIN-ERROR":
            return { ...state, authError: action.authError };
        default:
            return state;
    }
};

export const authMeTC = (): AppThunkType => async (dispatch:DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        console.log("Me in Auth thunk");
        const response = await authAPI.authMe();
        if (response.data) {
            const { id, role, email, name } = response.data;
            dispatch(setAuthUserDataAC(id, role, email, true));
        }
    } catch (e:any) {
        const err = e as Error | AxiosError<{ error: string }>;
        if (axios.isAxiosError(err)) {
            const error = err.response?.data.error || err.message;
            console.log(error)
        }
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
};


export const loginTC =
    (email: string, password:string): AppThunkType =>
        async (dispatch) => {
            dispatch(setIsRequestProcessingStatusAC(true));
            try {
                const response = await authAPI.login(email,password)
            } catch (e) {
                //handleError(e, dispatch);
            } finally {
                dispatch(setIsRequestProcessingStatusAC(false));
            }
        };

export const registrationTC =(name:string,email:string,password:string,role:string):AppThunkType=>
    async (dispatch)=>{

    }