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
    showTaskViue:{flag:false,taskFieldId:"",taskId:""},
    showFieldInfo:{flag:false,fieldId:""},
    materialEditorIsOpen: false as boolean,
    lastRemovedField:{} as LastRemoved,
    showFieldDescription : false as boolean,
    showCartInfo:false as boolean,
    showFullReportPopup:false as boolean,
};

export type MapInterfaseType = typeof MapInterfaceInitial;

export type MapInterfaseActionType =  ReturnType<typeof setSelectedFieldID>|
                          ReturnType<typeof setTaskParamsPopupIsOpen>|
                          ReturnType<typeof setFieldParamsPopupIsOpen>|
                          ReturnType<typeof setCanIDrow>|
                          ReturnType<typeof setSelectedFieldTrajectory>|
                          ReturnType<typeof setLastRemovedField>|
                          ReturnType<typeof setSelectedField>|
                          ReturnType<typeof setMaterialEditorFlag>|
                          ReturnType<typeof setShowFieldDescription>|
                          ReturnType<typeof setTaskViueIndeficatorData>|
                          ReturnType<typeof setShowCartInfo>|
                          ReturnType<typeof setFieldInfoFlag>|
                          ReturnType<typeof setFullReportPopupFlag>;


export const fieldIntarfaseReduser = (
                                         state:MapInterfaseType = MapInterfaceInitial,
                                         action:MapInterfaseActionType
                                    ):MapInterfaseType => {
    switch (action.type){
        case "SET/SELECTED/FIELD/ID":
            return {...state,selectedFieldID: action.fieldID}
        case "SET/TASK/PARAMS_POPUP":
            return {...state,taskParamsPopup:!state.taskParamsPopup}
        case "SET/DATA/FOR/TASK/VIUE":
            return {...state,showTaskViue:action.payload}
        case "SET/FIELD/PARAMS_POPUP":
            return {...state,fieldParamsPopup:!state.fieldParamsPopup}
        case "SET/MATERIAL/EDITOR/FLAG":
            return {...state,materialEditorIsOpen:!state.materialEditorIsOpen}
        case "SET/CAN/I/DRO/FLAG":
            return action.flag?{...state, canIDraw: !action.flag}:{...state,canIDraw:!state.canIDraw};
        case "SET/SELECTED/FIELD/TRAJECTORY":
            return {...state,selectedFieldTrajectory: action.trajectory}
        case "SET/LAST/REMOVED/FIELD/":
            return {...state,lastRemovedField: action.field}
        case "SET/SELECTED/FIELD":
            return {...state,selectedField:action.field}
        case "SET/FIELD_DESCRIPTION/VISIBLE":
            return {...state , showFieldDescription: !state.showFieldDescription}
        case "SET/SHOW/MATERIAL/INTERFACE":
            return action.flag?{...state,showCartInfo:action.flag}:{...state , showCartInfo:!state.showCartInfo}
        case "SET/FIELD/INFORMATION/FLAG/AND/DATA":
            return {...state,showFieldInfo:{...action.payload}}
        case "SET/FULL/REPORT/POPUP/FLAG":
            return {...state,showFullReportPopup:action.flag?action.flag:!state.showFullReportPopup}
        default: return state
    }
}

export const setSelectedFieldID  = (fieldID:string)=>(
    {
        type:"SET/SELECTED/FIELD/ID",
        fieldID
    } as const
)
export const setShowFieldDescription = ()=>(
    {type:"SET/FIELD_DESCRIPTION/VISIBLE"} as const
)

export const setTaskViueIndeficatorData = (data:{flag:boolean,taskFieldId:string,taskId:string}) => {
    return(
        {type:"SET/DATA/FOR/TASK/VIUE",payload:{...data}}
    )  as const
}
export const setFieldInfoFlag = (data:{flag:boolean,fieldId:string})=>(
    {
        type:"SET/FIELD/INFORMATION/FLAG/AND/DATA",
        payload:{...data}
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
export const setMaterialEditorFlag  =  ()=>(
    {
        type:"SET/MATERIAL/EDITOR/FLAG"
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
export const setShowCartInfo = (flag?:boolean) => (
    {
        type:"SET/SHOW/MATERIAL/INTERFACE",
        flag
    } as const
)
export const setFullReportPopupFlag = (flag?:boolean) =>(
    {
        type:"SET/FULL/REPORT/POPUP/FLAG",
        flag

    } as const
)



