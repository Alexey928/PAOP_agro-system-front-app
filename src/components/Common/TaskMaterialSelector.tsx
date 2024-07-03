import React, { useState} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import { MaterialType} from "../../BLL/material-reducer";
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
            {/*{*/}
            {/*    !! materialTasks.length && <div>*/}
            {/*        {*/}
            {/*             <TextField*/}
            {/*                 onChange={(event)=>{updatePlanedMaterialAmount(+event.target.value)}}*/}
            {/*                 type={"number"}*/}
            {/*                 InputProps={{*/}
            {/*                     style: {backgroundColor: '#00051e' ,color:"white"},*/}
            {/*                     endAdornment: <InputAdornment position="end"> {`л/га`} </InputAdornment>*/}
            {/*                 }}*/}
            {/*                id="outlined-start-adornment"*/}
            {/*                label="Плануєма Н/В"*/}
            {/*                variant="outlined"*/}

            {/*             />*/}
            {/*        }*/}

            {/*        {*/}
            {/*             isFieldNedet(materialTasks.length?materialTasks[0].material:"") && <TextField*/}
            {/*                InputProps={{*/}
            {/*                    style: {backgroundColor: '#00051e' ,color:"white"},*/}
            {/*                    endAdornment: <InputAdornment position="end"> {"л/га"} </InputAdornment>*/}
            {/*                }}*/}
            {/*                onChange={(event)=>{updateUnnesuseryWater(+ event.target)}}*/}
            {/*                type={"number"}*/}
            {/*                id="outlined-start-adornment"*/}
            {/*                label="Норма виливу"*/}
            {/*                variant="outlined"*/}
            {/*            />*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*    }*/}

        </div>
    );
};

export default TaskMaterialSelector;