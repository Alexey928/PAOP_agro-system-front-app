
export const  MapInterfaceInitial={
    selectedFieldID: null as string|null,
    selectedFieldColor: "#fffff" as string,
    canIDraw:false as boolean,
    selectedFieldTrajectory:[] as number[][],
    fieldParamsPopup: false as boolean,
    taskParamsPopup:false as boolean
};
export type MapInterfaseType = typeof MapInterfaceInitial;

export type MapInterfaseActionType =  ReturnType<typeof setSelectedFieldID>|
                          ReturnType<typeof setTaskParamsPupupIsOpen>|
                          ReturnType<typeof setFieldParamsPopupIsOpen>|
                          ReturnType<typeof setCanIDrow>|
                          ReturnType<typeof setSelectedFieldTrajectory>;

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
            return {...state,canIDraw:!state.canIDraw};
        case "SET/SELECTED/FIELD/TRAJECTORY":
            return {...state,selectedFieldTrajectory: action.trajectory}
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
