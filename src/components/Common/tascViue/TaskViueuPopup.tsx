import React from 'react';
import style from "./tascViueu.module.css";
import {useAppDispatch, useAppSelector} from "../../../BLL/Store";
import {selectFlagForTaskViue, selectTaskMaterials} from "../../../Utils/selectors";
import {Button} from "@mui/material";
import {setTaskViueIndeficatorData} from "../../../BLL/map-interfase-reduser";
import {taskTypeConvertEmun} from "../Forms/TaskParamForm";

type  TaskViueuType = {
    fieldID:string,
    taskId:string,
}

const TaskVuiePopup = () => {
 const dispatch = useAppDispatch();
 const viueOptions   = useAppSelector(selectFlagForTaskViue);
 const tasks = useAppSelector(selectTaskMaterials)[viueOptions.taskFieldId]
 const curentMaterials  = viueOptions.flag && tasks.
       filter((el) => el.id===viueOptions.taskId)[0].materials

const curentTascMaterialData =  viueOptions.flag && tasks.
filter((el) => el.id===viueOptions.taskId)[0].taskMaterials;

const curentTask = viueOptions.flag && tasks.
filter((el) => el.id===viueOptions.taskId)[0];

const curentFieldName  = curentTask && curentTask.field.name

console.log("Tasc Viue data ",curentMaterials,curentTascMaterialData,tasks);

 return (
    viueOptions.flag && viueOptions.taskId && viueOptions.taskFieldId ?
     <div className={"popup"} >
         <div className={style.information_container}>
             <h1>{curentTask?taskTypeConvertEmun[+curentTask.type]:""}</h1>
             <h2>{curentFieldName}</h2>
             <h2>Матеріали</h2>
             <div className={style.materials_contayner}>
                 {
                     curentTascMaterialData && curentMaterials ?
                         curentTascMaterialData.map((el,i)=>{
                         return(
                             <div className={style.task_material_information_item}>
                                 <div>
                                     <h2>{curentMaterials[i].type} </h2>
                                     <div>
                                         {curentMaterials[i].name} : {el.plannedMaterialAmount}{curentMaterials[i].cValue}
                                         {
                                             curentMaterials[i].type==="насіння"?`~~ 
                                             ${Math.round(el.plannedMaterialAmount/curentMaterials[i].packaging)} пак.`:
                                                 <div>
                                                     {`норма витрати - ${curentMaterials[i].consumptionRate}${curentMaterials[i].cValue}/Га`};
                                                 </div>
                                     }
                                     </div>
                                 </div>
                             </div>)
                     }):<></>
                 }
             </div>
             <Button onClick={()=>{
                 dispatch(setTaskViueIndeficatorData({flag:false,taskFieldId:"",taskId:""}))
             }} variant={"contained"} color={"error"}>X</Button>
         </div>
     </div>:<></>
    );
};

export default TaskVuiePopup;