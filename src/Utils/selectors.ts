import {AppRootStateType} from "../BLL/Store";

// app state selectors
export const selectAppInitStatus = (state: AppRootStateType): boolean => state.app.isInitialized;
export const selectAppCurrentPas = (state:AppRootStateType):string|null => state.app.currentPass

