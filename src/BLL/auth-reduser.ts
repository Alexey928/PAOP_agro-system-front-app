import {AppThunkType, DispatchType} from "./Store";
import {authAPI, ROOLS} from "../API/AuthApi";
import { setIsRequestProcessingStatusAC} from "./app-reduser";
import {handleError} from "../Utils/errorHandler";
import {setTokenInInstanse} from "../API/commonApiInstanse";

const initialState = {
    id: null as number | null,
    email: null as string | null,
    name: null as string | null,
    role:null as ROOLS|null,
    isAuth: false as boolean,

};

export type InitialStateType = typeof initialState;

export type AuthActionsType = | ReturnType<typeof setAuthUserDataAC>
                              | ReturnType<typeof setCaptchaUrlAC>

export const setCaptchaUrlAC = (captchaUrl: string | null) =>
    ({ type: "AUTH/SET-CAPTCHA", captchaUrl } as const);

export const setAuthUserDataAC = (
    id: number | null,
    role: ROOLS| null,
    name: string|null,
    email: string | null,
    isAuth: boolean
) =>
    ({
        type: "AUTH/SET-AUTH-USER-DATA",
        payload: {
            id,
            role,
            name,
            email,
            isAuth,
        },
    } as const);

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-AUTH-USER-DATA":
            return { ...state, ...action.payload };
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
            console.log(response)
            const { id, role, email, name } = response.data;
            dispatch(setAuthUserDataAC(id, role, email, name,true));
        }
    } catch (e) {
        handleError(e,dispatch,1500)
    } finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
};
export const loginTC =
    (email: string, password:string): AppThunkType =>
        async (dispatch) => {
            dispatch(setIsRequestProcessingStatusAC(true));
            try {
                const response = await authAPI.login(email,password);
                console.log(response)

                if (response.data && response.data.token) {
                    const { id, role, email, name, token } = response.data;
                    setTokenInInstanse(token);
                    dispatch(setAuthUserDataAC(id, role, email, name,true));

                }
            } catch (e) {
                handleError(e,dispatch,1500);
            } finally {
                dispatch(setIsRequestProcessingStatusAC(false));
            }
        };

export const registrationTC =(name:string,email:string,password:string,role:string):AppThunkType=>
    async (dispatch)=>{
        dispatch(setIsRequestProcessingStatusAC(true));
        try {
            const response = await authAPI.registration(email,password,name,role);
            if (response.data) {
                const { id, role, email, name } = response.data.user;
                const token = response.data.token;
                await setTokenInInstanse(token);
                dispatch(setAuthUserDataAC(id, role, email, name,true));
            }
        }catch (e){
            console.log(e);
        }finally {

        }

    }