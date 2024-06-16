import {AppRootStateType} from "../BLL/Store";
import {ROOLS} from "../API/AuthApi";
import {FieldType, mapFieldStateType} from "../BLL/map-filds-reduser";
import {MaterialItemType} from "../BLL/material-reducer";
import {TypesOfTask} from "../components/Common/Forms/TaskParamForm";

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
export const selectSelectedField  = (state:AppRootStateType):FieldType => state.fieldsInterfase.selectedField
export const selectFieldParamsPopupIsOpen = (state:AppRootStateType):boolean => state.fieldsInterfase.fieldParamsPopup;
export const selectTaskParamsPopupIsOpen = (state:AppRootStateType):boolean => state.fieldsInterfase.taskParamsPopup;
export const selectDrowingFlag = (state:AppRootStateType):boolean => state.fieldsInterfase.canIDraw;
export const selectSelectdFieldColor = (state:AppRootStateType):string => state.fieldsInterfase.selectedFieldColor;
export const selectSelectedFieldTrajectory = (state:AppRootStateType):number[][] => state.fieldsInterfase.selectedFieldTrajectory;
export const selectMaterialeditorFlag = (state:AppRootStateType):boolean => state.fieldsInterfase.materialEditorIsOpen
//materials selectors

export const selectMaterialsByOptionalType = (type:MaterialItemType, task?:string) => (state:AppRootStateType)  => {
    if(!task){
        switch (type){

            case "насіння":
                return state.materials.crops;
            case "добрива":
                return state.materials.fertilizer;
            case "хімія":
                return state.materials.chemistry;
            case "супутні":
                return state.materials.suply
            default:
                return []
        }
    }else{
        switch (task) {
            case"SHOWING_CROPS":
                return state.materials.crops
            case "SHOWING_CROPS_WIDTH_FERTILYZE":
                return [...state.materials.crops, ...state.materials.fertilizer];
            case "SPRAYING":
                return [...state.materials.chemistry];
            case "SOIL_WORKS":
                return []
            case "FERTILIZATION":
                return [...state.materials.fertilizer]
            case "HARVEST":
                return []
            case "WINDROWING_OF_PERENNIALS":// валкование
                return []
            case "MOWING_PERENNIALS"://покос кормовоЇ
                return []
            case "BALINING_OF_PERENNIALS":
                return [...state.materials.suply]
            case "TRANPORTING":
                return [];
            case "SEED TREATMENT":
                return [...state.materials.chemistry]
            default:
                return []
        }}
    }




