import { applyMiddleware, combineReducers,  legacy_createStore as createStore } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {AuthActionsType, authReducer} from "./auth-reduser";
import {AppActionsType, appReducer} from "./app-reduser";
import {fieldReducer, FieldStateActionType} from "./map-filds-reduser";
import {fieldIntarfaseReduser, MapInterfaseActionType} from "./map-interfase-reduser";
import {MaterialActionType, materialReducer, materialsStateType} from "./material-reducer";


const rootReducer = combineReducers({
   auth: authReducer,
   app:appReducer,
   mapFields:fieldReducer,
   fieldsInterfase:fieldIntarfaseReduser,
   materials:materialReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

type AppRootActionsType = AuthActionsType |
                          AppActionsType  |
                          FieldStateActionType|
                          MapInterfaseActionType|
                          MaterialActionType;

export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootStateType,
    unknown,
    AppRootActionsType
    >;

export type DispatchType = ThunkDispatch<AppRootStateType, unknown, AppRootActionsType>;
export const useAppDispatch = () => useDispatch<DispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

//@ts-ignore
window.store = store;






