import {instance} from "./commonApiInstanse";
import {TasckType} from "../BLL/fieldTaskReduser";

export type materialUsageDataType = {
    materialId:number
    planedAmount:number
    // Package:number
    unnesesuryWater:number
    currentConsumptionRate:number
}
export type CreateTasckDTOType = {
    from:Date;
    status:string;
    fieldId:string;
    materialIdes:materialUsageDataType[]
}


export const TascksApi = {
    create(dto:CreateTasckDTOType){
        return instance.post<TasckType>("tasks",dto);

    }
}