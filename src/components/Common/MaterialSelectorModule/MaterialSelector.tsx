import React, {useMemo, useState} from 'react';
import {useAppSelector} from "../../../BLL/Store";
import {selectMaterialsByOptionalType} from "../../../Utils/selectors";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

import {MaterialItemType} from "../../../BLL/material-reducer";
import {MaterialType} from "../../../BLL/material-reducer";

interface IFormInputs {
    materialID:number
}

type MaterialSelectorType  = {
    materialType:MaterialItemType
    krud?:boolean
    onChange?:(naterial:MaterialType) => void
}


const plaseolderMaterial:MaterialType = {
    id:"0",
    name:"заглушка",
    type:"хімія",
    cValue:"л",
    consumptionRate:"",
    basePrice:0,
    packaging:0,

}

const MaterialSelector:React.FC<MaterialSelectorType> = ({materialType,krud,onChange}) => {

    const currentMaterials = useAppSelector(selectMaterialsByOptionalType(materialType))
    const [currentMaterial,setCurrentMaterial] = useState<MaterialType>(currentMaterials[0]??plaseolderMaterial)
    console.log(currentMaterials);

    const hashByIDMaterials = useMemo(():{[key:string]:MaterialType}=>{
        const hash:{[key:string]:MaterialType} = {};
        currentMaterials.forEach((it) => hash[`${it.id}`] = it)
        return hash
    },[currentMaterials])

    const setMaterialHeandler = (value:string) => {
        setCurrentMaterial(hashByIDMaterials[value]);
        if(onChange) {

        }
    }
    return (
        <div style={{width:400,backgroundColor:"#00061f"}}>
            <FormControl  style={{width:190}} >
                    <InputLabel id="demo-simple-select-label">{materialType}</InputLabel>
                    <Select
                        color={"secondary"}
                        variant={"standard"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentMaterial.id}
                        label={materialType}
                        onChange={onChange?(e)=>{setMaterialHeandler(e.target.value)}:()=>{}}
                    >
                        {currentMaterials.map((el:MaterialType)=>{
                            return(
                                <MenuItem value={el.id}>{el.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            {krud && <div>
                            <Button variant={"contained"}>+</Button>
                            <Button variant={"contained"}>DEl</Button>

            </div>
            }

    </div>
    );
};

export default MaterialSelector;