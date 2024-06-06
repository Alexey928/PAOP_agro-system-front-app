import React, {useEffect, useState} from 'react';
import MaterialSelector from "./MaterialSelectorModule/MaterialSelector";
import {InputAdornment, TextField} from "@mui/material";
import { MaterialType} from "../../BLL/material-reducer";
type TaskMaterialsPropsType = {
    taskType:string
    currentFieldSqere:number
    setTascMaterial:(taskMaterial:MaterialTaskType)=>void

}
export type MaterialTaskType = {
    currentAmount:number | null,
    material : MaterialType,
    unnesesuryWater:number
}
const isFieldNedet = (material:MaterialType|"")=>{
    if(material){
        switch (material.type){
            case "хімія":
                return true
            default:
                return false
        }

    }
    return false
}
const getCurrent_C_Value = (materialTasks:MaterialTaskType[] | "") => materialTasks ? materialTasks[0].material.cValue : ""


const TaskMaterialSelector:React.FC<TaskMaterialsPropsType> = ({taskType,currentFieldSqere,setTascMaterial}) => {
    const [materialTasks, setMaterialTask] = useState<MaterialTaskType[]>([]);

    const updatePlanedMaterialAmount  = (norm:number) => {
        console.log(norm,currentFieldSqere,norm*currentFieldSqere)
        materialTasks && setMaterialTask([{...materialTasks[0],currentAmount:norm * currentFieldSqere}])
    }
    const updateMaterialTask = (material:MaterialType)=>{
        setMaterialTask([{material,currentAmount:null,unnesesuryWater:0}])
    }
    const updateUnnesuseryWater = (norm:number) => {
        materialTasks && setMaterialTask([{...materialTasks[0], unnesesuryWater:norm*currentFieldSqere}])
    }
    console.log(materialTasks,currentFieldSqere)
    const onSelectTaskMaterialEntity = ()=>{
        if(materialTasks){
            const materialTask = materialTasks[0]
            if(isFieldNedet(materialTasks[0].material)){
                materialTask.material &&
                materialTask.currentAmount &&
                materialTask.currentAmount?setTascMaterial(materialTasks[0]):window.alert("Не коретний ввод !!")
            }else{
                materialTask.material &&
                materialTask.currentAmount ? setTascMaterial(materialTasks[0]):window.alert("Не коретний ввод !!")
            }
        }
    }
    return (
        <div>
            <MaterialSelector materialType={""} task={taskType}  onSelect={updateMaterialTask}/>
            {
                <>
                    {
                         <TextField
                             onChange={(event)=>{updatePlanedMaterialAmount(+event.target.value)}}
                             type={"number"}
                             InputProps={{
                                 style: {backgroundColor: '#00051e' ,color:"white"},
                                 endAdornment: <InputAdornment position="end"> {`/га`} </InputAdornment>
                             }}
                            id="outlined-start-adornment"
                            label="Плануєма Н/В"
                            variant="outlined"

                         />
                    }

                    {
                         isFieldNedet(materialTasks.length?materialTasks[0].material:"") && <TextField
                            InputProps={{
                                style: {backgroundColor: '#00051e' ,color:"white"},
                                endAdornment: <InputAdornment position="end"> {"л/га"} </InputAdornment>
                            }}
                            onChange={(event)=>{updateUnnesuseryWater(+ event.target)}}
                            type={"number"}
                            id="outlined-start-adornment"
                            label="Норма виливу"
                            variant="outlined"
                        />
                    }
                </>
                }

        </div>
    );
};

export default TaskMaterialSelector;