//import {AppRootStateType} from "./Store";
import {MaterialType} from "./material-reducer";
import {DispatchType} from "./Store";
import {CreateTasckDTOType, materialUsageDataType, TascksApi} from "../API/TascksApi";
import {setIsRequestProcessingStatusAC} from "./app-reduser";

export type MaterialTaskDTOItemType = {
    currentAmount:number | null,
    material : MaterialType,
    unnesesuryWater:number,
    currentCunsuptionRate:number

}
 export type TasckType = {
    id:string,
    form:Date,
    to:Date,
    type:string,
    status:string,
    comment:string,
    fieldId:string,
    materials:{id:string}[],
    taskMaterials:MaterialTaskDTOItemType[]
    machines:{id:string}[],
    taskMachines:{}[],
}
type CreateTaskDto = {


}
type TascMaterialStateType  = {
    globalFrom:Date,
    globalTo:Date,
    tasksArray:TasckType[],
    tasksHashFromFields:{[fieldID:string]:TasckType[]},
    inProgressTasks:{[fieldID:string]:TasckType[]},


    }
export type TaskMaterialActionsType = ReturnType<typeof setTasksFromDB_AC>|
                               ReturnType<typeof addTaskAC>|
                               ReturnType<typeof removeTask>

const tasckMaterialInitialState:TascMaterialStateType = {
    globalFrom: new Date(),
    globalTo: new Date(),
    tasksArray:[],
    tasksHashFromFields:{},
    inProgressTasks:{},

}
const forArrToHash = <T extends {fieldId: string | null}>(arr:Array<T>):{[key:string]:T[]}=>{
    const temp:{[key:string]:T[]} = {};
    arr.forEach((e)=>{
    if(!temp[`${e.fieldId}`]) {
         temp[`${e.fieldId}`]=[e]
     }else {
        temp[`${e.fieldId}`].push(e)
    }
    })
    return temp
}
export  const DtoConverter = (dto:MaterialTaskDTOItemType[]):materialUsageDataType[] => {
    return dto.map((el)=>({
        materialId:+ el.material.id,
        planedAmount:+ el.currentAmount!,
        unnesesuryWater: el.unnesesuryWater,
        currentConsumptionRate: el.currentCunsuptionRate
    }))
}

export const fieldTaskReduser = (state:TascMaterialStateType = tasckMaterialInitialState,
                                 action:TaskMaterialActionsType): TascMaterialStateType =>
{
    switch (action.type) {
        case "SET/TASKS/FROM/DB":
            return {...state,tasksArray:action.tasks,tasksHashFromFields:action.hash}
        case "ADD/TASK":
            const temp = [...state.tasksArray,action.task]
            return {...state,tasksArray:temp, tasksHashFromFields:forArrToHash(temp)}
        case "REMOVE/TASK":
            const filtered = state.tasksArray.filter((el)=>el.id!==action.taskId);
            return {...state,tasksArray:filtered,tasksHashFromFields:forArrToHash(filtered)}
        default :
            return state



    }

}
//__----------------------Actions________________________________________________________________
const setTasksFromDB_AC = (tasks:TasckType[]) => (
    {
        type:"SET/TASKS/FROM/DB",
        tasks,
        hash:forArrToHash<TasckType>(tasks)
    } as const
);

const addTaskAC = (task:TasckType,fieldId:string) => (
    {
        type:"ADD/TASK",
        task,
        fieldId
    } as const
);
const removeTask = (taskId:string)=>(
    {
        type:"REMOVE/TASK",
        taskId
    } as const
);


//___________________________TC_______________________________________

export const createTaskTC = (task:CreateTasckDTOType,fieldId:string) =>
    async (dispatch:DispatchType) => {
        dispatch(setIsRequestProcessingStatusAC(true));
    try {
       const {data} = await TascksApi.create(task);
       addTaskAC(data,fieldId);
    }catch (e){
        console.log(e);
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }

    }

