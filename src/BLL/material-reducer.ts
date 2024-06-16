import {materialSortByType, removeByTypeOfTask, updateMaterialHeandler} from "../Utils/vorkWidthMaterial";
import {DispatchType} from "./Store";
import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {materialAPI} from "../API/materialAPI";

export  type CValueType = "га"|"кг"|"л"|"м"|"шт"
export type MaterialItemType = "хімія"|"добрива"|"насіння"|"пакування"|"супутні"|"ВОДА"|""

export type MaterialType={
    id:string,
    name:string,// конкретное название
    subName:string//пестициды,гербициды,инсектициды , фунгициды... у семян это культура : кукуруза ячмень и тд
    type:MaterialItemType
    cValue:CValueType,// base logic value
    consumptionRate:string,
    basePrice:number,// "$" default
    packaging:number,// cValue "200кг,шт,л..."
    metaData:string// ДВ у удобрений и химии или Геннерация у семян или
    thousenMas:number// только для семян у остальных 0
}
export const initialMaterialStateCreator = () => ( {
    fertilizer:[] as MaterialType[],
    crops:[] as MaterialType[],

    //package:[] as MaterialType[],
    suply:[] as MaterialType[],
    chemistry:[] as MaterialType[],
    Water:{} as MaterialType
} as const);

export type materialsStateType = ReturnType<typeof initialMaterialStateCreator>

export type MaterialActionType =  ReturnType<typeof setMaterialsFromDB_AC>  |
                                  ReturnType<typeof setNewMaterialFromDB_AC>  |
                                  ReturnType<typeof remoweMaterialAC>|
                                  ReturnType<typeof updateMaterialAC>
export const materialReducer = (state = initialMaterialStateCreator(), action:MaterialActionType):materialsStateType=>{
       switch (action.type){
           case "SET/MATERIAL/FROM/DB":
               return {...action.materials}
           case "SET/MEW/MATERIAL/TO/DICTIONARY":
               return materialSortByType([action.material],state)
           case "REMOVE/MATERIAL":
               return removeByTypeOfTask(action,state);
           case "UPDATE/MATERIAL":
               return updateMaterialHeandler(action.material,state)
           default:
               return state
       }
}
//______________________________AC_____________________________________________________
const setMaterialsFromDB_AC = (material:MaterialType[])=>(
    {
        type:"SET/MATERIAL/FROM/DB",
        materials:materialSortByType(material)
    } as const
)
const setNewMaterialFromDB_AC = (material:MaterialType)=>(
    {
        type:"SET/MEW/MATERIAL/TO/DICTIONARY",
        material,
    } as const
);
export const remoweMaterialAC = (id:string, type:MaterialItemType) =>({
    type:"REMOVE/MATERIAL",
    payload:{id,type}
} as const)

export const updateMaterialAC = (material:MaterialType)=>(
    {
        type:"UPDATE/MATERIAL",
        material
    } as const
)
// ________________________________________TC______________________________________________________

export const setMaterialsFromDB = () => async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const {data:materialData} = await materialAPI.getAll();
        console.log(materialData, "< - materials");
        materialData.length && setMaterialsFromDB_AC(materialData);
    }catch (e){
        console.log(e)
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}
export const createMaterialInDB_TC = (material:MaterialType)=> async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {



    }catch (e) {

    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}
export const removeMaterialFromDB = ()=> async () =>(dispatch:DispatchType) =>{
    dispatch(setIsRequestProcessingStatusAC(true));

    try {

    }catch (e) {

    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }

}
export const updateMaterialFromDB = ()=> async () =>(dispatch:DispatchType) =>{
    dispatch(setIsRequestProcessingStatusAC(true));

    try {

    }catch (e) {

    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }

}


