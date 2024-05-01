import {AppRootStateType} from "../BLL/Store";
import {ROOLS} from "../API/AuthApi";
import {mapFieldStateType} from "../BLL/map-filds-reduser";

// app state selectors
export const selectAppInitStatus = (state: AppRootStateType): boolean => state.app.isInitialized;
export const selectAppCurrentPas = (state:AppRootStateType):string|null => state.app.currentPass;
export const selectAppError = (state:AppRootStateType):string|null => state.app.appError
export const selectRequestProcesingStatus = (state:AppRootStateType):boolean => state.app.isRequestProcessing

// auth state selectors
export const selectIsAuth = (state:AppRootStateType):boolean => state.auth.isAuth;
export const selectUserRole = (state:AppRootStateType):ROOLS|null => state.auth.role;

//General Agronomist state selectors
export const selectFields = (state:AppRootStateType):mapFieldStateType => state.mapFields;

// fields interfase state selectors
export const selectSelectedFieldID = (state:AppRootStateType):string|null => state.fieldsInterfase.selectedFieldID;
export const selectFieldParamsPopupIsOpen = (state:AppRootStateType):boolean => state.fieldsInterfase.fieldParamsPopup;
export const selectTaskParamsPopupIsOpen = (state:AppRootStateType):boolean => state.fieldsInterfase.taskParamsPopup;
export const selectDrowingFlag = (state:AppRootStateType):boolean => state.fieldsInterfase.canIDraw;
export const selectSelectdFieldColor = (state:AppRootStateType):string => state.fieldsInterfase.selectedFieldColor;
export const selectSelectedFieldTrajectory = (state:AppRootStateType):number[][] => state.fieldsInterfase.selectedFieldTrajectory
//




