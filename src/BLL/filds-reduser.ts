import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {mapFieldAPI} from "../API/mapFieldAPI";
import {trajectoryToDTOstring} from "../Utils/parseTrajectory";


export type PerimetrType = {
    id:string
    squre:string
    trajectory:string
    validFrom:Date
}

export type fieldType = {
    field:{
        id:string
        name:string
        description:string
    }
    allPerimeters:PerimetrType[]
    currentPerimetr:number[][]

}
export type mapFieldStateType = Array<fieldType>
export type ActonType ={}

export const fieldReduser = (state:mapFieldStateType = [],action:ActonType):mapFieldStateType => {
    return []
}
export const createFieldAC = (name:string,description:string)=>(
    {
        type:"CREATE/FIELD",
        name,
        description
    } as const
);
export const setFieldPerimetrsAC = (fildID:string,perimetrs:PerimetrType[])=>(
    {
        type:"SET/FIELD/PERIMETERS",
        payload:{fildID,perimetrs},
    } as const
);
const setFieldStateFromDB_AC = (fields:mapFieldStateType)=>(
    {
        type:"SET/FIELD/DATA/FROM/DB/TO/STATE",
        fields
    } as const
);
export const createFieldTC = (name:string,description:string, trajectory:string)=> async (dispatch:any)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
       const field =  mapFieldAPI.create();
       const fieldPerimetr = mapFieldAPI.createFieldPerimetr("1",trajectoryToDTOstring([[1,3]]));
       dispatch(createFieldAC("some name", "some description"))
       dispatch(setFieldPerimetrsAC("1",[]))
    }catch (e:unknown){
        // if error we mast remove of field entity
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(true));
    }
}







