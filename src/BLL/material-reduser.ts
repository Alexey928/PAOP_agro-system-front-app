
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
export type materialsStateType = {
    [typeOfMaterial:string]:MaterialType[]
}
type MaterialActionType = ReturnType<typeof setMaterialsFromDB>

export const materialReduser = (state:{},action:MaterialActionType):materialsStateType=>{
       switch (action.type){
           default:
               return state
       }

}
const setMaterialsFromDB = (material:MaterialType[])=>(
    {
        type:"SET/MATERIAL/FROM/DB",



    } as const
)