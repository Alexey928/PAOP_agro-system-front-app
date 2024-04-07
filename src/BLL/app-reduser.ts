import { AppThunkType } from "./Store";
import { authMeTC } from "./auth-reduser";
//import { handleError } from "../utils/error-util";

const initialState = {
    isInitialized: false,
    isRequestProcessing: false,
    appError: null as string | null,
    currentPass:null as string|null
};

export const appReducer = (state = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-INITIALIZED": {
            return { ...state, isInitialized: action.isInitialized };
        }
        case "APP/SET-IS-REQUEST-PROCESSING-STATUS": {
            return { ...state, isRequestProcessing: action.isRequestProcessing };
        }
        case "APP/SET-APP-ERROR": {
            return { ...state, appError: action.appError };
        }
        default:
            return state;
    }
};
export const setCurrentPassAC = (currentPass:string|null) =>
    ({type:"AUTH/SET-CURR-PATH", currentPass} as const)

export const setIsInitializedAC = (isInitialized: boolean) =>
    ({
        type: "APP/SET-IS-INITIALIZED",
        isInitialized,
    } as const);

export const setIsRequestProcessingStatusAC = (isRequestProcessing: boolean) =>
    ({
        type: "APP/SET-IS-REQUEST-PROCESSING-STATUS",
        isRequestProcessing,
    } as const);
export const setAppErrorAC = (appError: string | null) =>
    ({ type: "APP/SET-APP-ERROR", appError } as const);

export const initializeAppTC = (): AppThunkType => async (dispatch) => {
    try {
        await dispatch(authMeTC());
    } catch (e) {
       console.log(e)
    } finally {
       dispatch(setIsInitializedAC(true));
    }
};
type InitialStateType = typeof initialState;

export type AppActionsType =
    | ReturnType<typeof setIsInitializedAC>
    | ReturnType<typeof setIsRequestProcessingStatusAC>
    | SetAppErrorType;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
