
export const  MapInterfaseInitial={
    selectedFieldID: null as string|null,
    canIdrow:false as boolean,
    fieldParamsPopup: false as boolean,
    taskParamsPopup:false as boolean
};
export type MapInterfaseType = typeof MapInterfaseInitial;

export type MapInterfaseActionType =  ReturnType<typeof setSelectedFieldID>|
                          ReturnType<typeof setTaskParamsPupupIsOpen>|
                          ReturnType<typeof setFieldParamsPopupIsOpen>|
                          ReturnType<typeof setCanIDrow>;

export const fieldIntarfaseReduser =(state:MapInterfaseType = MapInterfaseInitial,action:MapInterfaseActionType):MapInterfaseType=>{
    switch (action.type){
        case "SET/SELECTED/FIELD/ID":
            return {...state,selectedFieldID: action.fieldID}
        case "SET/TASK/PARAMS_POPUP":
            return {...state,taskParamsPopup:!state.taskParamsPopup}
        case "SET/FIELD/PARAMS_POPUP":
            return {...state,fieldParamsPopup:!state.fieldParamsPopup}
        default: return state
    }
}

export const setSelectedFieldID  = (fieldID:string)=>(
    {
        type:"SET/SELECTED/FIELD/ID",
        fieldID
    } as const
)
export const setTaskParamsPupupIsOpen = () => (
    {
        type:"SET/TASK/PARAMS_POPUP",
    } as const
)
export const setFieldParamsPopupIsOpen = ()=>(
    {
        type:"SET/FIELD/PARAMS_POPUP"
    } as const
)
export const setCanIDrow = ()=>(
    {
        type:"SET/CAN/I/DRO/FLAG"
    } as const
)
