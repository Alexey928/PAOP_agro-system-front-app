import {AppThunkType, DispatchType} from "./Store";
import {authAPI} from "../API/AuthApi";
import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {useNavigate} from "react-router-dom";

const initialState = {
    id: null as number | null,
    email: null as string | null,
    name: null as string | null,
    role:null as string|null,
    isAuth: false as boolean,
    currentPas: null as string|null,
    loginError: null as string | null,

};

export type InitialStateType = typeof initialState;

export type AuthActionsType =
    | ReturnType<typeof setAuthUserDataAC>
    | ReturnType<typeof setCaptchaUrlAC>
    | ReturnType<typeof setLoginErrorAC>;

export const setLoginErrorAC = (loginError: string | null) =>
    ({ type: "AUTH/SET-LOGIN-ERROR", loginError } as const);

export const setCaptchaUrlAC = (captchaUrl: string | null) =>
    ({ type: "AUTH/SET-CAPTCHA", captchaUrl } as const);

export const setAuthUserDataAC = (
    id: number | null,
    role: string | null,
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
            return { ...state, loginError: action.loginError };
        default:
            return state;
    }
};
export const authMeTC = (): AppThunkType => async (dispatch:DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        console.log("Me in Auth thunk");
        const response = await authAPI.authMe();

        if (response.data.id) {
            const { id, role, email } = response.data;
            dispatch(setAuthUserDataAC(id, role, email, true));
        }
    } catch (e) {
        console.log(e)

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