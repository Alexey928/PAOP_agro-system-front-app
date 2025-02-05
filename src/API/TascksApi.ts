import {instance} from "./commonApiInstanse";
import {TasckType, taskMaterialType} from "../BLL/fieldTaskReduser";

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
    },
    getAllTasksInPeriod(from:Date,to:Date){
        return instance.get<TasckType[]>(`tasks?from=${from.toDateString()}&to=${to.toDateString()}`)
    },
    remove(taskId:string){
        return instance.delete<{task:TasckType, materialAmount:taskMaterialType[]}>(taskId);
    }
}
