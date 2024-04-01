import {AppThunkType} from "./Store";
import {authAPI} from "../API/AuthApi";

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    loginError: null as string | null,
    captchaUrl: null as string | null,
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
    login: string | null,
    email: string | null,
    isAuth: boolean
) =>
    ({
        type: "AUTH/SET-AUTH-USER-DATA",
        payload: {
            id,
            login,
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
        case "AUTH/SET-CAPTCHA":
            return { ...state, captchaUrl: action.captchaUrl };
        default:
            return state;
    }
};


export const authMeTC = (): AppThunkType => async (dispatch) => {
    //dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const response = await authAPI.authMe();
        if (response.data.resultCode === 0) {
            const { id, login, email } = response.data.data;
            dispatch(setAuthUserDataAC(id, login, email, true));

        }
    } catch (e) {

    } finally {
        //dispatch(setIsRequestProcessingStatusAC(false));
    }
};