import {materialSortByType, removeByTypeOfMaterial, updateMaterialHeandler} from "../Utils/vorkWidthMaterial";
import {DispatchType} from "./Store";
import {setIsRequestProcessingStatusAC} from "./app-reduser";
import {materialAPI, MaterialDTOtype} from "../API/materialAPI";

export  type CValueType = "га"|"кг"|"л"|"м"|"шт"
export type MaterialItemType = "хімія"|"добрива"|"насіння"|"пакування"|"супутні"|"ВОДА"|""

export type MaterialType={
    id:string,
    name:string,// конкретное название
    subType:string//пестициды,гербициды,инсектициды , фунгициды... у семян это культура : кукуруза ячмень и тд
    type:MaterialItemType
    cValue:CValueType,// base logic value
    consumptionRate:string,
    basePrice:number,// "$" default
    packaging:number,// cValue "200кг,шт,л..."
    metaData:string// ДВ у удобрений и химии или Геннерация у семян или
    massOfThousen:number// только для семян у остальных 0
    //isVisiable:string
}
export const initialMaterialStateCreator = () => ({
    fertilizer:[] as MaterialType[],
    crops:[] as MaterialType[],
    suply:[] as MaterialType[],
    chemistry:[] as MaterialType[],

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
               return removeByTypeOfMaterial(action,state);
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
        materialData.length && dispatch(setMaterialsFromDB_AC(materialData));
    }catch (e){
        console.log(e);
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}
export const createMaterial_TC = (material:MaterialDTOtype)=> async (dispatch:DispatchType)=>{
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        debugger
        const {data:newMaterial} = await materialAPI.createMaterial(material);
        console.log(newMaterial);
        dispatch(setNewMaterialFromDB_AC(newMaterial));

    }catch (e){

    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}
export const removeMaterialFromDB = (id:string,materialName:string) => async (dispatch:DispatchType) =>{
    if(!window.confirm(`Ви певні що бажаєте видалити  матеріал "${materialName.toUpperCase()}" ?`)) return
    dispatch(setIsRequestProcessingStatusAC(true));
    try {
        const {data:materialData} = await materialAPI.removeMaterial(id);
        debugger;
        dispatch(remoweMaterialAC(id, materialData.type));
    }catch (e) {
      console.log(e)
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
