import React, {useMemo, useState} from 'react';
import {useAppSelector} from "../../../BLL/Store";
import {
    selectMaterialsByOptionalSubType,
    selectMaterialsByOptionalType,
    subTypesOfMaterial
} from "../../../Utils/selectors";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {MaterialItemType} from "../../../BLL/material-reducer";
import {MaterialType} from "../../../BLL/material-reducer";


interface IFormInputs {
    materialID:number
}

type MaterialSelectorType  = {
    materialType:MaterialItemType
    materialSubType?:subTypesOfMaterial
    krud?:boolean
    onAddMaterial?:(material:MaterialType) => void
    task?:string
    onSelect?:(material:MaterialType)=>void
}


const plaseolderMaterial:MaterialType = {
    id:"",
    name:"заглушка",
    subType:"",
    type:"насіння",
    cValue:"л",
    consumptionRate:"",
    metaData:"",
    basePrice:0,
    packaging:0,
    massOfThousen:0
}

const MaterialSelector:React.FC<MaterialSelectorType> = ({materialSubType ,materialType,krud,onAddMaterial,task,onSelect}) => {
    console.log("ms ", materialType)
    const plaseolderMaterial:MaterialType = {
        id:"",
        name:"заглушка",
        subType:"",
        type:materialType,
        cValue:"л",
        consumptionRate:"",
        metaData:"",
        basePrice:0,
        packaging:0,
        massOfThousen:0
    }
    const currentMaterials = useAppSelector(selectMaterialsByOptionalType(materialType,task));
    const currentMaterialsBySubtype = useAppSelector(selectMaterialsByOptionalSubType(materialSubType,materialType));

    const [currentMaterial,setCurrentMaterial] = useState<MaterialType>(plaseolderMaterial);

    const hashByIDMaterials = useMemo(():{[key:string]:MaterialType}=>{
        const hash:{[key:string]:MaterialType} = {};
        !currentMaterialsBySubtype.length?currentMaterials.forEach((it) => hash[`${it.id}`] = it):
         currentMaterialsBySubtype.forEach((it) => hash[`${it.id}`] = it)
        return hash
    },[currentMaterials,currentMaterialsBySubtype])

    const setMaterialHeandler = (value:string) => {
        setCurrentMaterial(hashByIDMaterials[value]);
        if(onAddMaterial) {
            onAddMaterial(hashByIDMaterials[value])
        }
        if(onSelect){
            onSelect(hashByIDMaterials[value])
        }
    }
    return (
        <div style={{width:400,height:120,flexWrap:"wrap",backgroundColor:"#090d44bd",padding:5,borderRadius:15,boxShadow:" rgb(68 71 108 / 75%) 2px 5px 16px 3px"}}>
            <FormControl  style={{width:190}} >
                    <InputLabel id="demo-simple-select-label">{materialType?materialType:"Оберіть матеріл"}</InputLabel>
                    <Select
                        SelectDisplayProps={
                            {style: {
                                    color:'#01f6bd',
                                    width:200,

                                }
                            }}
                        color={"secondary"}
                        variant={"outlined"}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentMaterial.id}
                        label={materialType ? materialType : "Оберіть матеріл"}
                        onChange={(e)=>{setMaterialHeandler(e.target.value)}}>
                        {!currentMaterialsBySubtype.length ? currentMaterials.map((el:MaterialType)=>{
                                return(
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                )
                            }):
                            currentMaterialsBySubtype.map((el:MaterialType)=>{
                                return(
                                    <MenuItem value={el.id}>{el.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            {krud && onAddMaterial ? <div>
                            <Button onClick={()=>{
                                onAddMaterial(currentMaterial)
                               }} variant={"contained"}>+</Button>
                            <Button variant={"contained"} color={"error"} style={{margin:2}}>DEl</Button>
                            <Button variant={"contained"} color={"secondary"}>EDIT</Button>
            </div>:<></>

            }

    </div>
    );
};
export default MaterialSelector;