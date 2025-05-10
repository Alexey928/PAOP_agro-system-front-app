import {instance} from "./commonApiInstanse";
import {CValueType, MaterialItemType, MaterialType} from "../BLL/material-reducer";

export type MaterialDTOtype = {
    name:string,// конкретное название
    subType:string//пестициды,гербициды,инсектициды , фунгициды... у семян это культура : кукуруза ячмень и тд
    type:MaterialItemType
    cValue:CValueType,// base logic value
    consumptionRate:string,
    basePrice:number,// "$" default
    packaging:number,// cValue "200кг,шт,л..."
    metaData:string// ДВ у удобрений и химии или Геннерация у семян или
    massOfThousen:number// только для семян у остальных 0
}

export const materialAPI = {
    getAll() {
        return instance.get<Array<MaterialType>>("/materials");
    },
    createMaterial(material:MaterialDTOtype){
        return instance.post<MaterialType>("materials",material)
    },
    updateMaterial(){
        return instance.patch("materials", {})
    },
    removeMaterial(id:string){
        return instance.delete<MaterialType>(`/materials/${id}`)

    }
}