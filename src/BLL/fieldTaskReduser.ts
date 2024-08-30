import {MaterialType} from "./material-reducer";
import {DispatchType} from "./Store";
import {CreateTasckDTOType, materialUsageDataType, TascksApi} from "../API/TascksApi";
import {setIsRequestProcessingStatusAC} from "./app-reduser";

export type MaterialTaskCreateItemType = {
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
    field:{id:number},
    taskMaterials:taskMaterialType[]
    machines:{id:string}[],
    taskMachines:{}[],
}
export type TaskMaterialActionsType = ReturnType<typeof setTasksFromDB_AC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof removeTask>

//______________________________________

type taskMaterialType = {
    Package:number|null,
    actualMaterialAmount:number|null,
    currentConsumptionRate:number,
    plannedMaterialAmount:number
}
type TascMaterialStateType  = {
    globalFrom:Date,
    globalTo:Date,
    tasksArray:TasckType[],
    tasksMapedFromFields:{[fieldID:string]:TasckType[]},
    inProgressTasks:{[fieldID:string]:TasckType[]},
}


const tasckMaterialInitialState:TascMaterialStateType = {
    globalFrom: new Date(),
    globalTo: new Date(),
    tasksArray:[],
    tasksMapedFromFields:{},
    inProgressTasks:{},

}
const forArrToHash = <T extends {field: {id:number} | null}>(arr:Array<T>):{[key:string]:T[]}=>{
    const temp:{[key:string]:T[]} = {};
    arr.forEach((e)=>{
    if(!temp[`${e.field?.id}`]) {
         temp[`${e.field?.id}`]=[e]
     }else {
        temp[`${e.field?.id}`].push(e)
    }
    })
    return temp
}
export  const DtoConverter = (dto:MaterialTaskCreateItemType[]):materialUsageDataType[] => {
    return dto.map((el)=>({
        materialId:+ el.material.id,
        planedAmount:Math.round(+ el.currentAmount!),
        unnesesuryWater: el.unnesesuryWater,
        currentConsumptionRate:Math.round(el.currentCunsuptionRate)
    }))
}

export const fieldTaskReduser = (state:TascMaterialStateType = tasckMaterialInitialState,
                                 action:TaskMaterialActionsType): TascMaterialStateType =>
{
    switch (action.type) {
        case "SET/TASKS/FROM/DB":
            return {...state,tasksArray:action.tasks,tasksMapedFromFields:action.hash}
        case "ADD/TASK":
            const temp = [...state.tasksArray,action.task]
            return {...state,tasksArray:temp, tasksMapedFromFields:forArrToHash(temp)}
        case "REMOVE/TASK":
            const filtered = state.tasksArray.filter((el)=>el.id!==action.taskId);
            return {...state,tasksArray:filtered,tasksMapedFromFields:forArrToHash(filtered)}
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
        console.log(data)
       dispatch(addTaskAC(data,fieldId));
    }catch (e){
        console.log(e);
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}

export const setTaskFromDB = () =>
    async (dispatch:DispatchType)=>{
        dispatch(setIsRequestProcessingStatusAC(true));
}

