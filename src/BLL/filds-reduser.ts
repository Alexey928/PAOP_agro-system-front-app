import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {mapFieldAPI} from "../API/mapFieldAPI";
import {parseTrajektory, trajectoryToDTOstring} from "../Utils/parseTrajectory";


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
    currentPerimetr:number[][]

}
export type mapFieldStateType = Array<FieldType>


export const fieldReduser = (state:mapFieldStateType = [], action:FieldStateActionType):mapFieldStateType => {
    switch (action.type) {
        case "SET/FIELD/DATA/FROM/DB/TO/STATE":
            return [...action.fields]
        case"SET/FIELDS/PERIMETERS":
            const perimeters = action.payload.perimetrs
            return state.map((el)=>(
                el.field.id===action.payload.fildID?
                    {...el,
                        allPerimeters:perimeters,
                        currentPerimetr:parseTrajektory(perimeters[perimeters.length-1].trajectory)}:
                    el)
            );
        case "SET/FIELD/PERIMETER":
            return state.map((el) => action.fieldID === el.field.id?
                {...el,allPerimeters:[...el.allPerimeters,action.perimeter],
                 currentPerimetr:parseTrajektory(action.perimeter.trajectory)}:
                el
            )
    }
    return []
}
export const createFieldAC = (name:string,description:string)=>(
    {
        type:"CREATE/FIELD",
        name,
        description
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

export type FieldStateActionType = ReturnType<typeof setFieldStateFromDB_AC>|
                                   ReturnType<typeof setFieldsPerimetersAC>|
                                   ReturnType<typeof createFieldAC>|
                                    ReturnType<typeof setFieldPerimeterAC>


export const createFieldTC = (name:string,description:string, trajectory:string)=> async (dispatch:any)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
       const field =  mapFieldAPI.create();
       const fieldPerimetr = mapFieldAPI.createFieldPerimetr("1",trajectoryToDTOstring([[1,3]]));
       dispatch(createFieldAC("some name", "some description"))
       dispatch(setFieldsPerimetersAC("1",[]))
    }catch (e:unknown){
        // if error we mast remove of field entity!!!
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(true));
    }
}
export const setDBstateTC = (fields:mapFieldStateType) => async (dispatch:any) => {
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const fieldsFromDB = mapFieldAPI.getAll()
    }catch (e){

    }finally {

    }
}







