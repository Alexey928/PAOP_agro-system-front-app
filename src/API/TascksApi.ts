import {instance} from "./commonApiInstanse";
import {TasckType} from "../BLL/fieldTaskReduser";

export type materialUsageDataType = {
    materialId:number
    planedAmount:number
    unnesesuryWater:number
    currentConsumptionRate:number
}
export type CreateTasckDTOType = {
    type:string,
    from:Date;
    status:string;
    square:number
    fieldId:string;
    materialIdes:materialUsageDataType[]
}


export const TascksApi = {
    create(dto:CreateTasckDTOType){
        return instance.post<TasckType>("tasks",dto);

    }
}