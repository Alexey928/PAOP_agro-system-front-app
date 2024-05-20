import {FieldType, PerimetrType} from "./map-filds-reduser";

export type LastRemoved = {
    name:string|null,
    description:string|null,
    fillColor:string|null
}
export const  MapInterfaceInitial={
    selectedField:{id:"1",name:"",perimeters:[{sqere:""} as PerimetrType]} as FieldType,
    selectedFieldID: null as string|null,
    selectedFieldColor: "#fffff" as string,
    canIDraw:false as boolean,
    selectedFieldTrajectory:[] as number[][],
    fieldParamsPopup: false as boolean,
    taskParamsPopup:false as boolean,
    lastRemovedField:{} as LastRemoved,


};
export type MapInterfaseType = typeof MapInterfaceInitial;

export type MapInterfaseActionType =  ReturnType<typeof setSelectedFieldID>|
                          ReturnType<typeof setTaskParamsPopupIsOpen>|
                          ReturnType<typeof setFieldParamsPopupIsOpen>|
                          ReturnType<typeof setCanIDrow>|
                          ReturnType<typeof setSelectedFieldTrajectory>|
                          ReturnType<typeof setLastRemovedField>|
                          ReturnType<typeof setSelectedField>;

export const fieldIntarfaseReduser = (
                                         state:MapInterfaseType = MapInterfaceInitial,
                                         action:MapInterfaseActionType
                                    ):MapInterfaseType => {
    switch (action.type){
        case "SET/SELECTED/FIELD/ID":
            return {...state,selectedFieldID: action.fieldID}
        case "SET/TASK/PARAMS_POPUP":
            return {...state,taskParamsPopup:!state.taskParamsPopup}
        case "SET/FIELD/PARAMS_POPUP":
            return {...state,fieldParamsPopup:!state.fieldParamsPopup}
        case "SET/CAN/I/DRO/FLAG":
            return action.flag?{...state, canIDraw: !action.flag}:{...state,canIDraw:!state.canIDraw};
        case "SET/SELECTED/FIELD/TRAJECTORY":
            return {...state,selectedFieldTrajectory: action.trajectory}
        case "SET/LAST/REMOVED/FIELD/":
            return {...state,lastRemovedField: action.field}
        case "SET/SELECTED/FIELD":
            return {...state,selectedField:action.field}

        default: return state
    }
}

export const setSelectedFieldID  = (fieldID:string)=>(
    {
        type:"SET/SELECTED/FIELD/ID",
        fieldID
    } as const
)

export const setSelectedFieldTrajectory = (trajectory:number[][]) =>(
    {
        type:"SET/SELECTED/FIELD/TRAJECTORY",
        trajectory
    }  as const
)
export const setTaskParamsPopupIsOpen = () => (
    {
        type:"SET/TASK/PARAMS_POPUP",
    } as const
)
export const setFieldParamsPopupIsOpen = ()=>(
    {
        type:"SET/FIELD/PARAMS_POPUP"
    } as const
)
export const setCanIDrow = (flag?:boolean)=>(
    {
        type:"SET/CAN/I/DRO/FLAG",
        flag
    } as const
)
export const setLastRemovedField = (field:LastRemoved) => (
    {
        type:"SET/LAST/REMOVED/FIELD/",
        field
    } as const
)
export const setSelectedField = (field:FieldType)=>(
    {
        type:"SET/SELECTED/FIELD",
        field
    } as const
)