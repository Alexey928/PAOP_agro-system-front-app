import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {fieldDTOType, mapFieldAPI} from "../API/mapFieldAPI";
import {parseTrajektory, trajectoryToDTOstring} from "../Utils/parseTrajectory";
import {DispatchType} from "./Store";
import {handleError} from "../Utils/errorHandler";
import {setLastRemovedField, setSelectedFieldID} from "./map-interfase-reduser";


export type FieldStateActionType =
    ReturnType<typeof setFieldStateFromDB_AC>|
    ReturnType<typeof setFieldsPerimetersAC>|
    ReturnType<typeof createFieldAC>|
    ReturnType<typeof setFieldPerimeterAC>|
    ReturnType<typeof resetFieldDataAC>|
    ReturnType<typeof removeFieldAC>;

export type mapFieldStateType = Array<FieldType>

export type PerimetrType = {
    id:string
    sqere:string
    trajectory:string
    validFrom:Date
}

export type FieldType = {
    id:string
    name:string
    description:string
    perimeters:PerimetrType[]
    currentPerimeter:number[][]
    fillColor:string
}

export const fieldReducer = (state:mapFieldStateType = [], action:FieldStateActionType):mapFieldStateType => {
    switch (action.type) {
        case "SET/FIELD/DATA/FROM/DB/TO/STATE":
            return action.fields.map((el)=>(
                {...el, currentPerimeter:el.perimeters.length > 0 ?
                    parseTrajektory(el.perimeters[el.perimeters.length - 1].trajectory) : []
                }))
        case"SET/FIELDS/PERIMETERS":
            const perimeters = action.payload.perimetrs
            return state.map((el) => (
                el.id===action.payload.fildID?
                    {...el,
                        allPerimeters:perimeters,
                        currentPerimeter:parseTrajektory(perimeters[perimeters.length-1].trajectory)}:
                    el)
            );
            case "SET/FIELD/PERIMETER":
                return state.map((el) => action.fieldID === el.id?
                {...el, perimeters:[...el.perimeters, action.perimeter],
                 currentPerimeter:parseTrajektory(action.perimeter.trajectory)}:
                el
            )
        case"CREATE/FIELD":
            return [...state,{...action.field, currentPerimeter : action.field.perimeters?.length > 0 ?
                    parseTrajektory(action.field.perimeters[action.field.perimeters.length - 1].trajectory):[]}]
        case"RESET/FIELD/DATA":
            return state.map((el)=> el.id === action.data.id?
                {...el,name:action.data.name, description:action.data.description}:
            el)
        case "REMOVE/FIELD":
            return state.filter((el)=>el.id !== action.fieldId)
        default:
            return state
    }
}
//________________________AC___________________________________________________________________________________
export const createFieldAC = (field:fieldDTOType)=>(
    {
        type:"CREATE/FIELD",
        field
    } as const
);
export const setFieldsPerimetersAC = (fildID:string, perimetrs:PerimetrType[])=>(// set all perimeters
    {
        type:"SET/FIELDS/PERIMETERS",
        payload:{fildID,perimetrs},
    } as const
);
export const setFieldPerimeterAC = (fieldID:string,perimeter:PerimetrType)=>(// set one perimeter
    {
        type:"SET/FIELD/PERIMETER",
        fieldID,
        perimeter,
    } as const
)
const setFieldStateFromDB_AC = (fields:Array<fieldDTOType>)=>(
    {
        type:"SET/FIELD/DATA/FROM/DB/TO/STATE",
        fields
    } as const
);
const resetFieldDataAC = (fieldID:string, name:string,description:string="some description")=>(
    {
        type:"RESET/FIELD/DATA",
        data:{
                id:fieldID,
                name,
                description
             }
    } as const
)
const removeFieldAC = (fieldId:string) =>(
    {
        type:"REMOVE/FIELD",
        fieldId
    } as const
)
//______________________________TC_____________________________________________________________________________
export const createFieldTC = (name:string,description:string,trajectory:number[][],sqere:string,color:string) =>
    async (dispatch:DispatchType)=> {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const field = await mapFieldAPI.create(name,description,color);
        field.data["perimeters"] = [];
        dispatch(createFieldAC(field.data));
        if(field.data.id) await dispatch(bindPerimeterToFieldTC(field.data.id,trajectory,sqere))
    }catch (e:unknown){
        handleError(e,dispatch)
        // if error we mast remove ,of field entity!!!
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
        dispatch(setSelectedFieldID(""));
    }
}
export const updateFieldTC = (config: {fieldID:string,name:string,description:string,trajectory?:number[][],sqere?:string,color:string})=>
    async (dispatch:DispatchType)=>{
    const {fieldID,description,name,trajectory,sqere,color} = config
        dispatch(setIsRequestProcessingStatusAC(true));
        try {
            const confirm = window.confirm("Ви певні що бажаєте оновити данні цього поля ?")
            if(confirm) {
                const updatedField = await mapFieldAPI.updateFieldData(fieldID, name, description, color);
                console.log(updatedField.data)
                dispatch(resetFieldDataAC(updatedField.data.id, updatedField.data.name, updatedField.data.description));
                trajectory && sqere && await dispatch(bindPerimeterToFieldTC(fieldID, trajectory, sqere)); // hear we are bind trajectory and square logically , only if both of them is chaining
            }
        }catch (e){
            handleError(e,dispatch);
        }finally {
            dispatch(setIsRequestProcessingStatusAC(false));
            dispatch(setSelectedFieldID(""));
        }

}

export const bindPerimeterToFieldTC = (fieldID:string,trajectory:number[][],sqere:string)=> async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const fieldPerimetr = await mapFieldAPI.createFieldPerimetr(fieldID,trajectoryToDTOstring(trajectory),sqere);
        console.log(fieldPerimetr.data)
        dispatch(setFieldPerimeterAC(fieldID,fieldPerimetr.data));
    }catch (e){
        handleError(e,dispatch)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}

export const setFieldsDBstateTC = () => async (dispatch:DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const fieldsFromDB = await mapFieldAPI.getAll();
        if(fieldsFromDB.data.length) {
            dispatch(setFieldStateFromDB_AC(fieldsFromDB.data));
            return
        }
        console.error("is error of reading data from response GET '/fields' !!")
    }catch (e){
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}

export const removeFieldTC = (fieldId:string)=>async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const confirm = window.confirm("Ви певні що бажаєте видалити це поле ?")
        if(confirm) {
            const removedField = await mapFieldAPI.removeFieldFromDB(fieldId);
            dispatch(removeFieldAC(fieldId));
            dispatch(setLastRemovedField(removedField.data));
        }
    }catch (e){
        handleError(e,dispatch)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}

