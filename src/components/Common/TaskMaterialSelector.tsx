import React, { useState} from 'react';
import SubMaterialSelector from "./SubTypeMaterialSelector/SubMaterialSelector";
import {MaterialTaskDTOType} from "../../BLL/fieldTaskReduser";

type TaskMaterialsPropsType = {

    taskType:string
    currentFieldSqere:number
    setTascMaterial:(taskMaterial:MaterialTaskDTOType)=>void

}


const getCurrent_C_Value = (materialTasks:MaterialTaskDTOType[] | "") => materialTasks ? materialTasks[0].material.cValue : ""


const TaskMaterialSelector:React.FC<TaskMaterialsPropsType> = ({taskType,currentFieldSqere}) => {
    const [materialTasks, setMaterialTask] = useState<MaterialTaskDTOType[]>([]);

    const onSelect = (materialTasck:MaterialTaskDTOType) => {
       setMaterialTask([...materialTasks,materialTasck])
   }

    return (
        <div>
            <SubMaterialSelector squerOftasck={currentFieldSqere} onSelect={onSelect} tasck={taskType} />
        </div>
    );
};

export default TaskMaterialSelector;