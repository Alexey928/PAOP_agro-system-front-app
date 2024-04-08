import {AppRootStateType} from "../BLL/Store";
import {ROOLS} from "../API/AuthApi";

// app state selectors
export const selectAppInitStatus = (state: AppRootStateType): boolean => state.app.isInitialized;
export const selectAppCurrentPas = (state:AppRootStateType):string|null => state.app.currentPass;
export const selectAppError = (state:AppRootStateType):string|null => state.app.appError

// auth state selectors
export const selectIsAuth = (state:AppRootStateType):boolean => state.auth.isAuth;
export const selectUserRole = (state:AppRootStateType):ROOLS|null => state.auth.role;

//General Agronomist state selectors



