import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {mapFieldAPI} from "../API/mapFieldAPI";
import {parseTrajektory, trajectoryToDTOstring} from "../Utils/parseTrajectory";
import {DispatchType} from "./Store";

export type FieldStateActionType =
    ReturnType<typeof setFieldStateFromDB_AC>|
    ReturnType<typeof setFieldsPerimetersAC>|
    ReturnType<typeof createFieldAC>|
    ReturnType<typeof setFieldPerimeterAC>|
    ReturnType<typeof resetFieldDataAC>

export type mapFieldStateType = Array<FieldType>

export type PerimetrType = {
    id:string
    squre:string
    trajectory:string
    validFrom:Date
}

export type FieldType = {
    field:{
        id:string
        name:string
        description:string
    }
    allPerimeters:PerimetrType[]
    currentPerimeter:number[][]

}

export const fieldReduser = (state:mapFieldStateType = [], action:FieldStateActionType):mapFieldStateType => {
    switch (action.type) {
        case "SET/FIELD/DATA/FROM/DB/TO/STATE":
            return [...action.fields]
        case"SET/FIELDS/PERIMETERS":
            const perimeters = action.payload.perimetrs
            return state.map((el) => (
                el.field.id===action.payload.fildID?
                    {...el,
                        allPerimeters:perimeters,
                        currentPerimeter:parseTrajektory(perimeters[perimeters.length-1].trajectory)}:
                    el)
            );
            case "SET/FIELD/PERIMETER":
            return state.map((el) => action.fieldID === el.field.id?
                {...el,allPerimeters:[...el.allPerimeters,action.perimeter],
                 currentPerimeter:parseTrajektory(action.perimeter.trajectory)}:
                el
            )
        case"CREATE/FIELD":
            return [...state,action.field]
        case"RESET/FIELD/DATA":
            return state.map((el)=> el.field.id === action.data.id?
                {...el,name:action.data.name, description:action.data.description}:
            el)
        default:
            return state
    }
}
//________________________AC___________________________________________________________________________________
export const createFieldAC = (field:FieldType)=>(
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
const setFieldStateFromDB_AC = (fields:mapFieldStateType)=>(
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
//______________________________TC_____________________________________________________________________________
export const createFieldTC = (name:string,description:string,trajectory:number[][],sqere:string)=> async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
       const field = await mapFieldAPI.create(name,description);
       dispatch(createFieldAC(field))
        if(field.field.id && trajectory.length) await bindPerimeterToFieldTC(field.field.id,trajectory,sqere)
    }catch (e:unknown){
        // if error we mast remove of field entity!!!
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(true));
    }
}
export const bindPerimeterToFieldTC = (fieldID:string,trajectory:number[][],sqere:string)=> async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const fieldPerimetr = await mapFieldAPI.createFieldPerimetr(fieldID,trajectoryToDTOstring(trajectory),sqere);
        dispatch(setFieldPerimeterAC(fieldID,fieldPerimetr))
    }catch (e){
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}
export const setDBstateTC = () => async (dispatch:DispatchType) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const fieldsFromDB = await mapFieldAPI.getAll();
        if(fieldsFromDB.data.length) {
            dispatch(setFieldStateFromDB_AC(fieldsFromDB.data));
            console.log(fieldsFromDB.data)
            return
        }
        // some error wi mast throw here !
        console.error("is error of reading data from response GET '/fields' !!")
    }catch (e){
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}

export const resetFieldData = (fieldID:string,name:string,description:string) => async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const resetedField = mapFieldAPI.updateFieldData(fieldID,name,description);
        dispatch(resetFieldDataAC(fieldID,name,description))
    }catch (e){
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}










