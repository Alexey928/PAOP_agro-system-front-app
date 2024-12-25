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
    field:{id:number,name:string},
    taskMaterials:taskMaterialType[]
    materials:MaterialType[],
    machines:{id:string}[],
    taskMachines:{}[],
}
export type TaskMaterialActionsType =
    ReturnType<typeof setTasksFromDB_AC> |
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
    isDoneTasks:{[fieldID:string]:TasckType[]},

}


const tasckMaterialInitialState:TascMaterialStateType = {
    globalFrom: new Date(),
    globalTo: new Date(),
    tasksArray:[],
    tasksMapedFromFields:{},
    isDoneTasks:{},

}

const forArrToHash = <T extends {field: {id:number} | null, status:string}>(arr:Array<T>):{[key:string]:T[]}=>{
    const temp:{[key:string]:T[]} = {};
    arr.forEach((e)=>{
    if(e.status==="in progress"){
        if(!temp[`${e.field?.id}`]) {
            temp[`${e.field?.id}`]=[e]
        }else {
            temp[`${e.field?.id}`].push(e)
        }
    }

    })
    return temp
}


const forArrToIsDoneHsh = <T extends {field: {id:number} | null,status:string}>(arr:Array<T>):{[key:string]:T[]}=>{
    const temp:{[key:string]:T[]} = {};
    arr.forEach((it,i)=>{
        if(it.status==="isDone"){
            if(!temp[`${it.field?.id}`]) {
                temp[`${it.field?.id}`]=[it]
            }else {
                temp[`${it.field?.id}`].push(it);
            }
        }

    })
    return temp;

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
            return {...state,tasksArray:action.tasks,tasksMapedFromFields:action.hash,isDoneTasks:action.isDoneHash}
        case "ADD/TASK":
            const temp = [...state.tasksArray,action.task]
            return {...state,tasksArray:temp, tasksMapedFromFields:forArrToHash(temp),isDoneTasks:forArrToIsDoneHsh<TasckType>(temp)}
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
        hash:forArrToHash<TasckType>(tasks),
        isDoneHash:forArrToIsDoneHsh<TasckType>(tasks)

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
      // debugger
       dispatch(addTaskAC(data,fieldId));
    }catch (e){
        console.log(e);
    }finally {
        dispatch(setIsRequestProcessingStatusAC(false));
    }
}

export const setTaskFromDB = (from:Date, to:Date) =>
    async (dispatch:DispatchType)=>{
        dispatch(setIsRequestProcessingStatusAC(true));
        try {
            const tasks = await TascksApi.getAllTasksInPeriod
            (new Date("2024-02-10T21:30:17.303Z"),
            new Date("2025-02-10T21:30:17.303Z"));
            dispatch (setTasksFromDB_AC(tasks.data));
        }catch (e){

        }finally {

        }

}

