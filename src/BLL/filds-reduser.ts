import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {mapFieldAPI} from "../API/mapFieldAPI";
import {trajectoryToDTOstring} from "../Utils/parseTrajectory";


export type perimetrType  = {
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
    allPerimetersJSON:perimetrType[]
    currentPerimetr:number[][]

}
export type mapFieldStateType = Array<fieldType>
export type ActonType ={}

export const fieldReduser = (state:mapFieldStateType = [],action:ActonType):mapFieldStateType => {

 return []
}
export const createFieldAC = (name:string,description:string)=>({name,description} as const)
export const setFieldPerimetrsAC = (fildID:string)=>({} as const)

export const createFieldTC = (name:string,description:string, trajectory:string)=> async (dispatch:any)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
       const field =  mapFieldAPI.create();
       const fieldPerimetr = mapFieldAPI.createFieldPerimetr("1",trajectoryToDTOstring([[1,3]]));
       dispatch(createFieldAC("some name", "some description"))



    }catch (e:unknown){
        // if error we mast remove of field entity
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(true));
    }
}







