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
    onChange?:(material:MaterialType) => void
    task?:string
    onSelect?:(material:MaterialType)=>void
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

const MaterialSelector:React.FC<MaterialSelectorType> = ({materialType,krud,onChange,task,onSelect}) => {
    const currentMaterials = useAppSelector(selectMaterialsByOptionalType(materialType,task))
    const [currentMaterial,setCurrentMaterial] = useState<MaterialType>(currentMaterials[0] ?? plaseolderMaterial)

    const hashByIDMaterials = useMemo(():{[key:string]:MaterialType}=>{
        const hash:{[key:string]:MaterialType} = {};
        currentMaterials.forEach((it) => hash[`${it.id}`] = it)
        return hash
    },[currentMaterials])

    const setMaterialHeandler = (value:string) => {
        setCurrentMaterial(hashByIDMaterials[value]);
        if(onChange) {

        }
        if(onSelect){

        }
    }
    return (
        <div style={{width:400,height:120,flexWrap:"wrap",backgroundColor:"#090d44bd",padding:5,borderRadius:15,boxShadow:" rgb(68 71 108 / 75%) 2px 5px 16px 3px"}}>
            <FormControl  style={{width:190}} >
                    <InputLabel id="demo-simple-select-label">{materialType}</InputLabel>
                    <Select
                        color={"secondary"}
                        variant={"outlined"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentMaterial.id}
                        label={materialType}
                        onChange={(e)=>{setMaterialHeandler(e.target.value)}}>

                        {currentMaterials.map((el:MaterialType)=>{
                            return(
                                <MenuItem value={el.id}>{el.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            {krud && onChange ? <div>
                            <Button variant={"contained"}>+</Button>
                            <Button variant={"contained"} color={"error"} style={{margin:2}}>DEl</Button>
                            <Button variant={"contained"} color={"secondary"}>EDIT</Button>
            </div>:<></>

            }

    </div>
    );
};

export default MaterialSelector;