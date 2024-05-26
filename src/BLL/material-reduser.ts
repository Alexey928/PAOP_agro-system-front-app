import {materialSortByType, removeByTypeOfTask, updateMaterialHeandler} from "../Utils/vorkWidthMaterial";

type CValueType = "га"|"кг"|"л"|"м"|"шт"
type MaterialItemType = "хімія"|"добрива"|"пальне"|"насіння"|"пакування"|"супутні"

export type MaterialType={
    id:string,
    name:string,
    type:MaterialItemType
    cValue:CValueType,// base logic value
    consumptionRate:string,
    basePrice:number,// "$" default
    packaging:number, // cValue "200кг,шт,л..."
}
export const initialMaterialStateCreator = () => ( {
    fertilizer:[] as MaterialType[],
    crops:[] as MaterialType[],
    fuel:[] as MaterialType[],
    package:[] as MaterialType[],
    suply:[] as MaterialType[],
    kemikal:[] as MaterialType[],
} as const);

export type materialsStateType = ReturnType<typeof initialMaterialStateCreator>

export type MaterialActionType =  ReturnType<typeof setMaterialsFromDB>  |
                                  ReturnType<typeof setNewMaterialFromDB>  |
                                  ReturnType<typeof remoweMaterial>|
                                  ReturnType<typeof updateMaterial>
export const materialReduser = (state = initialMaterialStateCreator(),action:MaterialActionType):materialsStateType=>{
       switch (action.type){
           case "SET/MATERIAL/FROM/DB":
               return {...action.materials}
           case "SET/MEW/MATERIAL/TO/DICTIONARY":
               return {...materialSortByType([action.material],state)}
           case "REMOVE/MATERIAL":
               return removeByTypeOfTask(action,state);
           case "UDATE/MATERIAL":
               return updateMaterialHeandler(action.material,state)
           default:
               return state
       }

}
const setMaterialsFromDB = (material:MaterialType[])=>(
    {
        type:"SET/MATERIAL/FROM/DB",
        materials:materialSortByType(material)
    } as const
)
const setNewMaterialFromDB = (material:MaterialType)=>(
    {
        type:"SET/MEW/MATERIAL/TO/DICTIONARY",
        material,
    } as const
);
export const remoweMaterial = (id:string,type:MaterialItemType) =>({
    type:"REMOVE/MATERIAL",
    payload:{id,type}
} as const)

export const updateMaterial = (material:MaterialType)=>(
    {
        type:"UDATE/MATERIAL",
        material
    } as const
)


