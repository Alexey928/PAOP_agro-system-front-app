import { applyMiddleware, combineReducers,  legacy_createStore as createStore } from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {AuthActionsType, authReducer} from "./auth-reduser";


const rootReducer = combineReducers({
   auth: authReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;
type AppRootActionsType = AuthActionsType

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






